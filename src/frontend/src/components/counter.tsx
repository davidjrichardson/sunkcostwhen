import { useMemo, useState, useEffect } from "react";
import { SegmentedDisplay } from "./segmented-display";
import type { SegmentedDisplayProps } from "./segmented-display";
import { SunoButton } from "./suno-button";
import './counter.css';

function secondsToTime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${days} days ${hours} hours ${minutes} mins ${Math.floor(seconds)} seconds`;
}

type CounterProps = {
    websocket: WebSocket;
};

function Counter(props: CounterProps) {
    const { websocket } = props;
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [days, setDays] = useState<number>(0);
    const [hiscore, setHiscore] = useState<number>(0);

    const displayProps = useMemo<SegmentedDisplayProps>(() => ({
        days,
        hours,
        minutes,
        seconds,
    }), [days, hours, minutes, seconds]);

    websocket.onmessage = (event: MessageEvent<string>) => {
        const { data, type } = JSON.parse(event.data);
        if (type === 'reset') {
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
            if (data && data.hiscore) {
                setHiscore(data.hiscore);
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const rolloverSeconds = seconds >= 59;
            setSeconds(rolloverSeconds ? 0 : seconds + 1);
            const rolloverMinutes = rolloverSeconds && minutes >= 59;
            setMinutes(rolloverMinutes ? 0 : rolloverSeconds ? minutes + 1 : minutes);
            const rolloverHours = rolloverMinutes && hours >= 23;
            setHours(rolloverHours ? 0 : rolloverMinutes ? hours + 1 : hours);
            if (rolloverHours) {
                setDays(days + 1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [days, hours, minutes, seconds]);

    return (
        <div className="counter-container">
            <div className="counter-title">IT HAS BEEN</div>
            <div className="counter-wrapper">
                <SegmentedDisplay {...displayProps}/>
            </div>
            <div className="counter-caption">
                <p>Since the last mention of <SunoButton/> Cost Fallacy.</p>
                <small>High score: {secondsToTime(hiscore)}</small>
                {/* <small>High score: 0 days 0 hours 0 mins 0 seconds.</small> */}
            </div>
        </div>
    );
}

function LoadingCounter() {
    return (
        <div className="counter-container">
            <div className="counter-title">IT HAS BEEN</div>
            <div className="counter-wrapper">
                <SegmentedDisplay days={0} hours={0} minutes={0} seconds={0}/>
            </div>
            <div className="counter-caption">
                <p>Since the last mention of <SunoButton/> Cost Fallacy.</p>
                <small>High score loading...</small>
            </div>
        </div>
    );
}

export { Counter, LoadingCounter };
export type { CounterProps };
