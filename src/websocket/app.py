import asyncio
import tornado
import os
from sqlalchemy import Engine, create_engine
from handlers import ResetHandler

# TODO: Logging

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_NAME = os.getenv("DB_NAME")


if not all([DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME]):
    raise ValueError("Make sure all database connection info is set")


def make_app(engine: Engine):
    return tornado.web.Application(
        [
            (r"/reset", ResetHandler, dict(engine=engine)),
        ]
    )


async def main():
    # TODO: Pull in env vars for database connection
    engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)
    app = make_app(engine)
    app.listen(8888)
    await asyncio.Event().wait()


if __name__ == "__main__":
    asyncio.run(main())
