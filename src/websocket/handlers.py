from tornado.websocket import WebSocketHandler


class ResetHandler(WebSocketHandler):
    """
    Websocket endpoint that handles resetting the timer and updating the longest interval.
    """

    def initialize(self, engine):
        self.engine = engine

    def on_message(self):
        # TODO: Reset the timer and update the longest interval
        pass
