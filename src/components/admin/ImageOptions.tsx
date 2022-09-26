/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack } from "@mui/material";
import MyModal from "components/my/MyModal";
import "cropperjs/dist/cropper.css";
import { useState } from "react";
import Cropper from "react-cropper";

interface Props {
    cropData: any;
    setCropData: any;
}

function ImageOptions({ setCropData, cropData }: Props) {
    const [openChangeImage, setOpenChangeImage] = useState(false);
    const [image, setImage] = useState(undefined);
    const [cropper, setCropper] = useState<any>();

    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    const handleCloseChangeImage = () => {
        setOpenChangeImage(false);
        setImage(undefined);
    };

    const handleChangeImage = () => {
        setOpenChangeImage(false);
        setImage(undefined);
    };

    return (
        <>
            <Button
                sx={{ mb: 2 }}
                type='button'
                variant='contained'
                fullWidth
                onClick={() => {
                    setOpenChangeImage(true);
                }}
            >
                {cropData !== null ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
            </Button>

            <MyModal
                open={openChangeImage}
                onClose={handleCloseChangeImage}
                sx={{
                    overflow: "scroll",
                    height: "80%",
                    display: "block",
                }}
            >
                <Stack bgcolor={"background.paper"} color={"text.primary"}>
                    <Button variant='contained' component='label'>
                        Wybierz zdjęcie
                        <input hidden accept='image/*' type='file' onChange={onChange} />
                    </Button>
                    <Cropper
                        aspectRatio={16 / 9}
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={50}
                        minCropBoxWidth={50}
                        background={true}
                        center={true}
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                        guides={true}
                    />
                    <Button
                        type='button'
                        variant='contained'
                        onClick={getCropData}
                        disabled={!image}
                    >
                        Wytnij
                    </Button>
                    <img src={cropData} alt='Wycięte zdjęcie' />
                    <Button
                        type='button'
                        variant='contained'
                        disabled={!cropData}
                        onClick={handleChangeImage}
                    >
                        Ustaw
                    </Button>
                </Stack>
            </MyModal>
        </>
    );
}

export default ImageOptions;
