import { useMemo, useState, useEffect } from "react";
import { SegmentedDisplay } from "./segmented-display";
import type { SegmentedDisplayProps } from "./segmented-display";
import { SunoButton } from "./suno-button";
import './counter.css';

function Counter() {
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [days, setDays] = useState<number>(0);

    const displayProps = useMemo<SegmentedDisplayProps>(() => ({
        days,
        hours,
        minutes,
        seconds,
    }), [days, hours, minutes, seconds]);

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
                <small>High score: 0 days 0 hours 0 mins 0 seconds.</small>
            </div>
        </div>
    );
}

export { Counter };
