import React from "react";

const EditorView = () => {
    return (
        <div className="animated fadeIn">
            <iframe
                src="https://codesandbox.io/embed/lexical-react-editor-npi9by?fontsize=14&hidenavigation=1&theme=dark"
                style={{
                    width: "100%",
                    height: "800px",
                    border: 0,
                    borderRadius: "4px",
                    overflow: "hidden"
                }}
                title="lexical-react-editor"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
        </div>
    );
};

export default EditorView;
