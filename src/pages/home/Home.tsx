import {
  Box,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { PageContainer } from "components/index";
import CreatePostComponent from "components/post/CreatePostComponent";
import PostComponent from "components/post/PostComponent";
import { Icon } from "@iconify/react";
import AvatarComponent from "components/avatar/AvatarComponent";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useNavigate } from "react-router-dom";
import React from "react";
import { setSnack } from "src/redux/reducers/snack.reducer";
import orderBy from 'lodash/orderBy';
import { PostTypes } from "utils/types/post.types";

function CustomListItem({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick?: () => void;
}) {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon>
        <Icon style={{ fontSize: 24 }} icon={icon} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [posts, setPosts] = React.useState<PostTypes[]>([]);
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));

  React.useEffect(() => {
    if (socket) {
      socket.emit("get-posts-request");
      socket.on("create-post-response", (data) => {
        setPosts(data);
      });
      socket.on("get-posts-response", (data) => {
        setPosts(data);
      });
      socket.on("get-posts-error", (data) => {
        dispatch(setSnack({ open: true, message: data, type: "error" }));
      });
    }
  }, [socket, dispatch]);

  return (
    <PageContainer title="Home" sx={{ p: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <List
            sx={{
              "& .MuiTypography-root": {
                fontWeight: 600,
              },
            }}
          >
            <ListItemButton onClick={() => navigate("/profile")}>
              <Stack direction="row" alignItems="center">
                <AvatarComponent sx={{ mr: 2 }} />
                <ListItemText primary={user.displayName} />
              </Stack>
            </ListItemButton>
            <CustomListItem
              onClick={() => navigate("/all-friends")}
              icon="pepicons-pencil:persons"
              text="Friends"
            />
            <CustomListItem
              icon="fa6-solid:clock-rotate-left"
              text="Memories"
            />
            <CustomListItem icon="fontisto:favorite" text="Saved" />
            <CustomListItem icon="ic:round-groups" text="Groups" />
            <CustomListItem icon="ph:video-thin" text="Video" />
            <CustomListItem icon="uil:store-alt" text="Marketplace" />
            <CustomListItem icon="fluent-mdl2:payment-card" text="Feed" />
            <CustomListItem icon="emojione:spiral-calendar" text="Events" />
          </List>
        </Grid>
        <Grid item xs={6}>
          <Container
            sx={{
              maxWidth: 520,
              minWidth: 520,
              minHeight: "calc(100vh - 80px)",
              maxHeight: "calc(100vh - 80px)",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <CreatePostComponent />
            {orderBy(posts, "timestamp", 'desc').map((post) => (
              <PostComponent key={post._id} {...post} />
            ))}
            {posts.length === 0 && (
              <Box textAlign="center" mt={4}>
                <h1>No posts found</h1>
              </Box>
            )}
          </Container>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </PageContainer>
  );
}
