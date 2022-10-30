import { Delete, ExpandMore } from "@mui/icons-material";
import {
    Button,
    CardHeader,
    Collapse,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ExpandMoreIcon } from "components/my/ExpandMore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // import plugin
import parse from "html-react-parser";
import { useState } from "react";
import { PostType } from "store/app-slice";
dayjs.locale("pl");
dayjs.extend(relativeTime);

const { MODE, VITE_GOOGLE_BUCKET_URL, VITE_POSTS_FOLDER } = import.meta.env;

type Props = {
    post: PostType;

    handleDelete: (post: PostType) => void;
};

function Post({ post, handleDelete }: Props) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const isSameDay = () => {
        if (dayjs(post.startDate).isSame(post.endDate, "day")) {
            return true;
        } else {
            return false;
        }
    };

    const subheader = () => {
        if (post.isTrip) {
            if (isSameDay()) {
                return `Data rozpoczęcia [ ${dayjs(post.startDate).format(
                    "DD.MM.YYYY"
                )} ] [ jednodniowa ] [ ${dayjs(post.startDate).fromNow()} ]`;
            } else {
                return `Data rozpoczęcia [ ${dayjs(post.startDate).format(
                    "DD.MM.YY"
                )} ] do [ ${dayjs(post.endDate).format("DD.MM.YY")} ] [ ${dayjs(
                    post.startDate
                ).fromNow()} ]`;
            }
        } else {
            return `Data  [ ${dayjs(post.startDate).format("DD.MM.YYYY")} ]`;
        }
    };

    return (
        <Card
            sx={{
                width: "100%",
                borderRadius: 2,
                backgroundColor: "background.default",
                boxShadow: 15,
            }}
        >
            <CardHeader
                title={
                    <Typography sx={{ typography: { xs: "h6", sm: "h4" } }}>
                        {post.title}
                    </Typography>
                }
                subheader={
                    <Typography
                        sx={{ typography: { xs: "caption", sm: "h6" } }}
                        alignContent={"center"}
                    >
                        {subheader()}
                    </Typography>
                }
                action={
                    <IconButton aria-label="settings" onClick={() => handleDelete(post)}>
                        <Delete sx={{ color: "red" }} />
                    </IconButton>
                }
            />
            <Divider />

            {post.isTrip && (
                <>
                    <CardMedia
                        component="img"
                        image={`${VITE_GOOGLE_BUCKET_URL}/${MODE}/${VITE_POSTS_FOLDER}/${post.imageID}`}
                        sx={{ objectFit: "contain", minWidth: "100%" }}
                    />
                    <Divider />
                </>
            )}

            <Stack
                component={Button}
                fullWidth
                direction={"row"}
                justifyContent="center"
                onClick={handleExpandClick}
            >
                <ExpandMoreIcon
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ height: "32px" }}
                >
                    <ExpandMore />
                </ExpandMoreIcon>

                <Typography variant="h6" alignContent={"center"}>
                    Więcej informacji
                </Typography>
                <ExpandMoreIcon
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ height: "32px" }}
                >
                    <ExpandMore />
                </ExpandMoreIcon>
            </Stack>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ mx: "2%", my: "2%" }}>{parse(post.content)}</CardContent>
            </Collapse>
        </Card>
    );
}
export default Post;
