type SegmentedDisplayProps = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
import './segmented-display.css';

function dictToClassName(dict: Record<string, boolean>): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.entries(dict).filter(([_key, value]) => value).map(([key, _value]) => key).join(' ');
}


function SegmentedDisplay(props: SegmentedDisplayProps) {
    const { days, hours, minutes, seconds } = props;

    return (
        <div className="segmented-display">
            <div className={dictToClassName({
                "count": true,
                "active": days > 0,
            })}>{String(days).padStart(3,'0')}<span className="label">day</span></div>
            <div className={dictToClassName({
                "count": true,
                "active": hours > 0 || days > 0,
            })}>{String(hours).padStart(2,'0')}<span className="label">hrs</span></div>
            <div className={dictToClassName({
                "count": true,
                "active": minutes > 0 || hours > 0 || days > 0,
            })}>{String(minutes).padStart(2,'0')}<span className="label">min</span></div>
            <div className={dictToClassName({
                "count": true,
                "active": true,
            })}>{String(seconds).padStart(2,'0')}<span className="label">sec</span></div>
        </div>
    );
}

export { SegmentedDisplay };
export type { SegmentedDisplayProps };
