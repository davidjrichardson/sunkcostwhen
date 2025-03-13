import asyncio
import tornado
import os
from sqlalchemy import Engine, create_engine
from handlers import ResetHandler
from models import Base

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_NAME = os.getenv("DB_NAME")

WS_PORT = os.getenv("WS_PORT")

if not all([DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME]):
    raise ValueError("Make sure all database connection info is set")

if not WS_PORT:
    raise ValueError("Make sure the websocket port is set")


def make_app(engine: Engine):
    return tornado.web.Application(
        [
            (r"/", ResetHandler, dict(engine=engine)),
        ]
    )


async def main():
    engine = create_engine(
        f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}", echo=True
    )
    app = make_app(engine)
    print("Creating database tables")
    Base.metadata.create_all(engine)
    print(f"Starting websocket server on port {WS_PORT}")
    app.listen(int(WS_PORT))
    await asyncio.Event().wait()


if __name__ == "__main__":
    asyncio.run(main())
