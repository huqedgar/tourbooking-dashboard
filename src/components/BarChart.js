import { useCallback, useEffect, useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { groupBy } from 'lodash';

const BarChart = ({ data, day, month, year, filter, fromDay }) => {
    const [revenue, setRevenue] = useState(null);

    const calculateRevenue = useCallback(() => {
        if (!data) return;
        if (filter === 'Timeline') {
            switch (true) {
                case year !== 'All' && month !== 'All' && day !== 'All':
                    setRevenue(
                        data.RELATED_BILL.list_bill.map((bill) => ({
                            x: bill.code_bill,
                            revenue: bill.totals_bill,
                        })),
                    );
                    break;
                case year !== 'All' && month !== 'All':
                    const dailyRevenue = data.RELATED_BILL.list_bill.reduce((acc, bill) => {
                        const date = new Date(bill.created_date).toISOString().slice(0, 10);
                        if (!acc[date]) {
                            acc[date] = 0;
                        }
                        acc[date] += parseFloat(bill.totals_bill);
                        return acc;
                    }, {});
                    setRevenue(
                        Object.entries(dailyRevenue).map(([date, revenue]) => ({
                            x: date,
                            revenue: revenue,
                        })),
                    );
                    break;
                case year !== 'All':
                    const monthlyRevenue = data.RELATED_BILL.list_bill.reduce((acc, bill) => {
                        const month = new Date(bill.created_date).getMonth() + 1;
                        if (!acc[month]) {
                            acc[month] = 0;
                        }
                        acc[month] += parseFloat(bill.totals_bill);
                        return acc;
                    }, []);

                    setRevenue(
                        Object.entries(monthlyRevenue).map(([month, revenue]) => ({
                            x: month,
                            revenue: revenue,
                        })),
                    );
                    break;
                default:
                    const revenueByYear = data.RELATED_BILL.list_bill.reduce((result, bill) => {
                        const year = new Date(bill.created_date).getFullYear();
                        if (!result[year]) {
                            result[year] = 0;
                        }
                        result[year] += parseFloat(bill.totals_bill);
                        return result;
                    }, {});

                    setRevenue(
                        Object.keys(revenueByYear).map((year) => ({
                            x: year,
                            revenue: revenueByYear[year],
                        })),
                    );
            }
        } else if (fromDay) {
            const groupedData = groupBy(data.RELATED_BILL.list_bill, (bill) => {
                const date = new Date(bill.created_date);
                return `${date.getMonth() + 1}-${date.getFullYear()}`;
            });

            setRevenue(
                Object.entries(groupedData).map(([date, bills]) => ({
                    x: date,
                    revenue: bills.reduce((total, bill) => total + parseFloat(bill.totals_bill), 0),
                })),
            );
        } else {
            const revenueByYear = data.RELATED_BILL.list_bill.reduce((result, bill) => {
                const year = new Date(bill.created_date).getFullYear();
                if (!result[year]) {
                    result[year] = 0;
                }
                result[year] += parseFloat(bill.totals_bill);
                return result;
            }, {});

            setRevenue(
                Object.keys(revenueByYear).map((year) => ({
                    x: year,
                    revenue: revenueByYear[year],
                })),
            );
        }
    }, [data, day, month, year, filter, fromDay]);

    useEffect(() => {
        calculateRevenue();
    }, [calculateRevenue]);

    const memoizedRevenue = useMemo(() => revenue, [revenue]);

    if (!memoizedRevenue) {
        return <div className="app"></div>;
    }

    return (
        memoizedRevenue && (
            <ResponsiveBar
                data={memoizedRevenue}
                keys={['revenue']}
                indexBy="x"
                margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'category10' }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -25,
                    legend: 'Time',
                    legendPosition: 'middle',
                    legendOffset: 70,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Revenue (VNĐ)',
                    legendPosition: 'middle',
                    legendOffset: 20,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        )
    );
};

export default BarChart;
