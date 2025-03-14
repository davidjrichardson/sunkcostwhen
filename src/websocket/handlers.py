from datetime import datetime, timedelta
from typing import Union
from tornado.websocket import WebSocketHandler
import json

from sqlalchemy.orm import Session
from models import TimerReset, LongestInterval


active_clients = set()


class ResetHandler(WebSocketHandler):
    """
    Websocket endpoint that handles resetting the timer and updating the longest interval.
    """

    def check_origin(self, origin):
        return True

    def initialize(self, engine):
        self.engine = engine

    def open(self):
        active_clients.add(self)
        return super().open()

    def on_close(self):
        active_clients.remove(self)
        return super().on_close()

    def on_message(self, message):
        message = json.loads(message)

        with Session(self.engine) as session:
            session.begin()
            try:
                if message["type"] == "ping":
                    self.write_message(json.dumps({"type": "pong"}))
                elif message["type"] == "reset":
                    reset = self.reset_timer(session)
                    hiscore = self.update_hiscore(session, reset)
                    for client in active_clients:
                        client.write_message(
                            json.dumps(
                                {
                                    "type": "reset",
                                    "data": {
                                        "hiscore": hiscore.interval.total_seconds(),
                                        "timestamp": reset.timestamp.isoformat(),
                                    },
                                }
                            )
                        )

            except:
                session.rollback()
                raise
            else:
                session.commit()

    def reset_timer(self, session) -> TimerReset:
        reset = TimerReset(timestamp=datetime.now())
        session.add(reset)
        return reset

    def update_hiscore(
        self, session, reset: TimerReset
    ) -> Union[LongestInterval, None]:
        current = session.query(LongestInterval).first()
        if current is None:
            # No current interval, so create one
            current = LongestInterval(
                interval=timedelta(seconds=0), ending_reset_id=reset.id
            )
            session.add(current)

            return current
        else:
            # Calculate the new interval using the time between the last two resets
            second = session.query(TimerReset).order_by(TimerReset.timestamp.desc()).limit(1).first()
            interval = reset.timestamp - second.timestamp
            if interval > current.interval:
                # Update the interval
                current.interval = interval
                current.ending_reset_id = reset.id

            return current
