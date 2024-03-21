import {
  Badge,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
// import postImg from "assets/images/post_image.jpg";
import { Icon } from "@iconify/react";
import AvatarComponent from "components/avatar/AvatarComponent";
import { get } from "lodash";
import moment from "moment";
import { PostTypes } from "utils/types/post.types";
import { Image } from "antd";
import { useAppSelector } from "src/redux/hooks";

export default function PostComponent(props: PostTypes) {
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));
  return (
    <Paper elevation={2} sx={{ borderRadius: 1, mb: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}
      >
        <AvatarComponent sx={{ mr: 1 }} />
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">
            <strong>{get(props, "owner.displayName")}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(get(props, "timestamp")).fromNow()}
          </Typography>
        </Stack>
        {/* <IconButton>
          <Icon icon="ri:more-line" />
        </IconButton> */}
        {user._id === get(props, "owner._id") && (
          <IconButton
            onClick={() => {
              socket.emit("delete-post", props._id);
            }}
          >
            <Icon icon="carbon:close" />
          </IconButton>
        )}
      </Stack>
      {props.type === "text" ? (
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            py: 3,
          }}
        >
          <Typography variant="h3">{props.content}</Typography>
        </Box>
      ) : props.type === "image" ? (
        <Image
          src={props.content}
          alt="post"
          style={{
            width: "100%",
            maxHeight: 400,
            objectFit: "contain",
          }}
        />
      ) : (
        <video
          src={props.content}
          controls
          style={{
            width: "100%",
            height: 250,
          }}
        />
      )}
      {props.type !== "text" && (
        <Typography sx={{ px: 2, py: 1 }} variant="subtitle1">
          {props.text}
        </Typography>
      )}
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 1, borderTop: 1, borderColor: "divider" }}
      >
        <Button
          sx={{ bgcolor: "transparent" }}
          startIcon={
            props.likes.includes(user._id) ? (
              <Badge anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              
              }} badgeContent={props.likes?.length} color='primary'>
                <Icon
                icon="mdi:like"
                style={{ fontSize: 20, color: " #17A9FD" }}
              />
              </Badge>
            ) : (
              <Icon icon="ei:like" style={{ fontSize: 26 }} />
            )
          }
          fullWidth
          onClick={() => {
            if (props.likes?.includes(user._id)) {
              socket.emit("unlike-post", {
                post_id: props._id,
                user_id: user._id,
              });
            } else {
              socket.emit("like-post", {
                post_id: props._id,
                user_id: user._id,
              });
            }
          }}
        >
          {props.likes?.includes(user._id) ? "Unlike" : "Like"}
        </Button>
        <Button
          sx={{ bgcolor: "transparent" }}
          startIcon={
            <Icon icon="teenyicons:chat-outline" style={{ fontSize: 16 }} />
          }
          fullWidth
        >
          Comment
        </Button>
        <Button
          sx={{ bgcolor: "transparent" }}
          startIcon={<Icon icon="ri:share-forward-line" />}
          fullWidth
        >
          Share
        </Button>
      </Stack>
    </Paper>
  );
}
