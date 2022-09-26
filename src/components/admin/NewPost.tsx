/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { PostAdd } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, ToggleButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import MyTextField from "components/my/MyTextField";
import MyToggleButtonGroup from "components/my/MyToggleButtonGroup";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "hooks/redux";
import { useStableNavigate } from "middleware/StableNavigateContextProvider";
import React, { useState } from "react";
import { newInformation, newTrip } from "store/post-actions";
import ImageOptions from "./ImageOptions";

function NewPost() {
    const [isTrip, setIsTrip] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cropData, setCropData] = useState(null);
    const [startDate, setStartDate] = useState<Dayjs>(null);
    const [endDate, setEndDate] = useState<Dayjs>(null);

    const dispatch = useAppDispatch();
    const navigate = useStableNavigate();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleNewPost = () => {
        if (isTrip) dispatch(newTrip(title, startDate, endDate, cropData, content, navigate));
        else dispatch(newInformation(title, startDate, content, navigate));
    };

    return (
        <Stack
            sx={{ mx: { xs: 1, sm: 20, md: 25, lg: 35, xl: 45 } }}
            justifyContent='center'
            alignItems='center'
        >
            <Avatar
                sx={{
                    my: 3,
                    bgcolor: "primary.main",
                    width: "70px",
                    height: "70px",
                    color: "white",
                }}
            >
                <PostAdd fontSize='large' />
            </Avatar>

            <Typography component='h1' variant='h4' mb={2}>
                Nowa
            </Typography>
            <MyToggleButtonGroup
                color='secondary'
                value={isTrip}
                exclusive
                onChange={(event, value: boolean) => {
                    setIsTrip(value);
                }}
                fullWidth
            >
                <ToggleButton value={true}>Wycieczka</ToggleButton>
                <ToggleButton value={false}>Informacja</ToggleButton>
            </MyToggleButtonGroup>

            <Box component={"form"} noValidate sx={{ mt: 3 }}>
                <MyTextField
                    autoFocus={true}
                    sx={{ mb: 3 }}
                    name='title'
                    label={"Tytuł"}
                    value={title}
                    onChange={handleTitleChange}
                />

                <Stack direction={"row"} justifyContent={"center"} spacing={10} mb={2}>
                    <DatePicker
                        label={isTrip ? "Data wyjazdu" : "Data"}
                        value={startDate}
                        minDate={new Date()}
                        onChange={(newValue) => {
                            setStartDate(dayjs(newValue));
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{
                                    svg: { color: "secondary.main" },
                                    input: { color: "secondary.main" },
                                    label: { color: "secondary.main" },
                                }}
                            />
                        )}
                    />
                    {isTrip && (
                        <DatePicker
                            label='Data przyjazdu'
                            value={endDate}
                            minDate={startDate}
                            onChange={(newValue) => {
                                setEndDate(dayjs(newValue));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{
                                        svg: { color: "secondary.main" },
                                        input: { color: "secondary.main" },
                                        label: { color: "secondary.main" },
                                    }}
                                />
                            )}
                        />
                    )}
                </Stack>
                {isTrip && <ImageOptions cropData={cropData} setCropData={setCropData} />}

                <Box style={{ color: "#000", background: "#fff" }}>
                    <CKEditor
                        onReady={(editor) => {
                            editor.ui
                                .getEditableElement()
                                .parentElement.insertBefore(
                                    editor.ui.view.toolbar.element,
                                    editor.ui.getEditableElement(),
                                );

                            // this.editor = editor;
                        }}
                        onError={(error, { willEditorRestart }) => {
                            if (willEditorRestart) {
                                this.editor.ui.view.toolbar.element.remove();
                            }
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                        editor={DecoupledEditor}
                        data={content}
                        config={{
                            removePlugins: [
                                "EasyImage",
                                "MediaEmbed",
                                "ImageUpload",
                                "uploadImage",
                            ],
                        }}
                    />
                </Box>

                <Button
                    type='button'
                    fullWidth
                    variant='contained'
                    onClick={handleNewPost}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Dodaj
                </Button>
            </Box>
        </Stack>
    );
}
export default NewPost;
