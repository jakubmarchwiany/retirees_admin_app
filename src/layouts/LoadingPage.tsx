import { Toaster } from "react-hot-toast";

function LoadingPage() {
    return (
        <div
            style={{
                backgroundColor: "#424242",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Toaster
                position='bottom-center'
                gutter={10}
                // reverseOrder={true}
                containerStyle={{ marginBottom: "40px" }}
                toastOptions={{
                    style: {
                        background: "#303030",
                        color: "white",
                        minWidth: "250px",
                    },
                }}
            />
        </div>
    );
}

export default LoadingPage;
