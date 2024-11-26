import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Box from "@mui/material/Box";

/**
 * Customized Post Card Copy
 */
function PostCardCopy({ post }) {
    return (
        <Card
            sx={{
                maxWidth: 200, // Reduced width for half the size
                margin: "8px auto", // Compact margin
                borderRadius: "8px", // Small border radius
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
                backgroundColor: "#1e293b", // Dark background
                color: "white", // White text
                padding: "8px", // Smaller padding
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        src={`http://localhost:3005/images/${post.user?.avatar}`}
                        alt={post.user?.name || "User"}
                        sx={{
                            bgcolor: "primary.main",
                            width: 32, // Reduced avatar size
                            height: 32,
                            fontSize: "0.75rem", // Compact fallback initials
                        }}
                    >
                        {!post.user?.avatar && post.user?.name?.charAt(0)}
                    </Avatar>
                }
                // action={
                //     <IconButton sx={{ color: "white", padding: "4px" }}>
                //         <FuseSvgIcon size={12}>
                //             heroicons-outline:dots-vertical
                //         </FuseSvgIcon>
                //     </IconButton>
                // }
                title={
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                            variant="body2" // Smaller title text
                            fontWeight="bold"
                            sx={{ color: "white", fontSize: "0.8rem" }}
                        >
                            {post.user?.name || "Anonymous"}
                        </Typography>
                        <Typography
                            variant="caption" // Smaller subtitle
                            sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "0.8rem",
                            }}
                        >
                            shared an article with you
                        </Typography>
                    </Box>
                }
                subheader={
                    <Typography
                        variant="caption"
                        sx={{
                            color: "rgba(255, 255, 255, 0.5)", // Muted white
                            fontSize: "0.8rem", // Tiny timestamp text
                            fontStyle: "italic",
                        }}
                    >
                        {new Date(post.time).toLocaleString()}
                    </Typography>
                }
            />
            <CardContent>
                <Typography
                    variant="body2" // Smaller content text
                    sx={{
                        color: "white",
                        whiteSpace: "pre-wrap",
                        fontSize: "0.9rem", // Compact font size
                        marginBottom: "8px",
                    }}
                >
                    {post.text || "No content available."}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "rgba(255, 255, 255, 0.7)", // Muted white
                        fontSize: "0.8rem", // Smaller action buttons
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                cursor: "pointer",
                                color: "white",
                                fontSize: "0.9rem",
                            }}
                        >
                            Like (0)
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                cursor: "pointer",
                                color: "white",
                                fontSize: "0.9rem",
                            }}
                        >
                            Dislike (0)
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default PostCardCopy;
