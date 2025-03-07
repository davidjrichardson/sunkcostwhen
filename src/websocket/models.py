import uuid
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import DateTime, UUID, Interval, ForeignKey
from datetime import datetime, timedelta


class Base(DeclarativeBase):
    """
    Base class for all models
    """

    pass


class TimerReset(Base):
    """
    A history of when the timer was reset
    """

    __tablename__ = "timer_reset"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    timestamp: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    def __str__(self):
        return f"Timer reset at {self.timestamp}"

    def __repr__(self):
        return f"<TimerReset id={self.id} timestamp={self.timestamp}>"


class LongestInterval(Base):
    """
    The longest interval between resets. This is a singleton table.
    """

    __tablename__ = "longest_interval"

    id: Mapped[int] = mapped_column(int, primary_key=True, default=1)
    interval: Mapped[timedelta] = mapped_column(Interval, nullable=False)
    ending_reset_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("timer_reset.id"), nullable=False
    )

    def __str__(self):
        return f"{self.interval} ended by {self.ending_reset_id}"

    def __repr__(self):
        return f"<LongestInterval interval={self.interval} ending_reset_id={self.ending_reset_id}>"
