import { useState, useRef, useEffect } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);

  useEffect(() => {
    const currentTab = tabRefs.current[selectedTab];
    if (currentTab) {
      setIndicatorStyle({
        width: currentTab.offsetWidth,
        transform: `translateX(${currentTab.offsetLeft}px)`,
      });
    }
  }, [selectedTab, data]);

  const activeTab = (tab, index) => {
    setSelectedTab(index);
    onTabChange?.(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={tab}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={indicatorStyle} />
      </div>
    </div>
  );
};

export default SwitchTabs;