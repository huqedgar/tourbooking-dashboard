import { ResponsivePie } from '@nivo/pie';
import { useCallback, useEffect, useMemo, useState } from 'react';

const PieChart = ({ data }) => {
    const [revenue, setRevenue] = useState(null);

    const calculateRevenue = useCallback(() => {
        if (!data) return;
        setRevenue(
            data.map((tour) => ({
                id: tour.name_tour,
                value: tour.count_ticket_per_tour,
            })),
        );
    }, [data]);

    useEffect(() => {
        calculateRevenue();
    }, [calculateRevenue]);

    const memoizedRevenue = useMemo(() => revenue, [revenue]);

    if (!memoizedRevenue) {
        return <div className="app"></div>;
    }

    return (
        memoizedRevenue && (
            <ResponsivePie
                data={memoizedRevenue}
                margin={{ top: 50, right: 20, bottom: 50, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'category10' }}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        )
    );
};

export default PieChart;
