import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Box from "@mui/material/Box";

function PostCard({ post }) {
    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: "16px auto",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        src={post.user?.avatar || ""}
                        alt={post.user?.name || "User"}
                        sx={{ bgcolor: "primary.main" }}
                    />
                }
                action={
                    <IconButton>
                        <FuseSvgIcon size={20}>
                            heroicons-outline:dots-vertical
                        </FuseSvgIcon>
                    </IconButton>
                }
                title={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {post.user?.name || "Anonymous"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            shared an article with you
                        </Typography>
                    </Box>
                }
                subheader={
                    <Typography variant="caption" color="textSecondary">
                        {new Date(post.time).toLocaleString()}
                    </Typography>
                }
            />
            <CardContent>
                <Typography
                    variant="body1"
                    color="textPrimary"
                    sx={{ whiteSpace: "pre-wrap" }}
                >
                    {post.text || "No content provided"}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "16px",
                        color: "textSecondary",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                            Like (0)
                        </Typography>
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                            Dislike (0)
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default PostCard;
