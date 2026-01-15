import { Navigate, Route, Routes } from "react-router-dom";

import Angi from "../../../../Pages/Archive/Angi/index";
import Comandlal from "../../../../Pages/Archive/Comandlal/index";
import Graphic from "../../../../Pages/Archive/Graphic/Graphic";
import Statistic from "../../../../Pages/Archive/Graphic/Statistic";
import Hadgalamj from "../../../../Pages/Archive/Hadgalamj/index";
import Humrug from "../../../../Pages/Archive/Humrug/index";
import Huthereg from "../../../../Pages/Archive/Huthereg/index";
import Salbar from "../../../../Pages/Archive/Salbar/index";
import TovchilsonUg from "../../../../Pages/Archive/TovchilsonUg/index";
import User from "../../../../Pages/Archive/User/index";
import DansBurtgel from "../../../../Pages/Archive/DansBurtgel/index";
import BaingaIlts from "../../../../Pages/Archive/BaingaIlts/index";

import Home from "../../../../Pages/OptionFund/Home/Home";

const MyRoutes = (props) => {
    const { handleFirstMenuClick, getMissionType } = props;
    return (
        <Routes>
            {/* 👉 Root redirect */}
            <Route path="/" element={<Navigate to="/Home" />} />

            <Route
                path="/Home"
                element={
                    <Home
                        handleFirstMenuClick={handleFirstMenuClick}
                        getMissionType={getMissionType}
                    />
                }
            />

            <Route path="/get/users" element={<User />} />
            <Route path="/get/comandlals" element={<Comandlal />} />
            <Route path="/get/classes" element={<Angi />} />
            <Route path="/get/salbars" element={<Salbar />} />
            <Route path="/get/hutheregs" element={<Huthereg />} />
            <Route path="/get/statistic" element={<Statistic />} />
            <Route path="/get/graphic" element={<Graphic />} />
            <Route path="/get/hadgalamj" element={<Hadgalamj />} />
            <Route path="/get/humrugs" element={<Humrug />} />
            <Route path="/get/DansBurtgels" element={<DansBurtgel />} />
            <Route path="/get/tovchililsonUgs" element={<TovchilsonUg />} />
            <Route path="/get/BaingaIlts" element={<BaingaIlts />} />

            {/* 404 */}
            <Route path="*" element={<h1>Хуудас олдсонгүй</h1>} />
        </Routes>
    );
};

export default MyRoutes;
