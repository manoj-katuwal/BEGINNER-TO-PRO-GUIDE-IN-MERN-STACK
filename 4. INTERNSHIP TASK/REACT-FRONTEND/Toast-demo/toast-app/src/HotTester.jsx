import React, { useState } from "react";

const HotTester = () => {
    const [show, setShow] = useState(false);

    const showToast = () => {
        setShow(true);

        // hide after 3 seconds
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    return (
        <div style={{ padding: "40px" }}>
            <button
                onClick={showToast}
                style={{
                    padding: "10px 20px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                Test Toast
            </button>

            {show && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        background: "#111827",
                        color: "white",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    }}
                >
                    🔥 Hot Tester Working!
                </div>
            )}
        </div>
    );
};

export default HotTester;
