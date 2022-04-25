import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useMemo } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
    const [userStats, setUserStats] = React.useState([]);
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );
    React.useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats");
                console.log(res.data.data);
                res.data.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        {
                            name: MONTHS[item._id - 1],
                            "Active User": item.total,
                        },
                    ])
                );
            } catch (error) {}
        };
        getStats();
    }, [MONTHS]);
    console.log(userStats);
    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="home">
                    <FeaturedInfo />
                    <Chart
                        data={userStats}
                        title="User Analytics"
                        grid
                        dataKey="Active User"
                    />
                    <div className="homeWidgets">
                        <WidgetSm />
                        <WidgetLg />
                    </div>
                </div>
            </div>
        </>
    );
}
