import React from 'react'
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const Sidebar = ({user}) => {
    return (
        <div>
            <Paper sx={{ width: { xs: "100%", md: 250 }, padding: 2, marginBottom: { xs: 2, md: 0 }, marginRight: { md: 2 } }}>
                <Typography variant="h6" gutterBottom>Friends</Typography>
                <List>
                    {user?.friends.map((contact, index) => (
                        <ListItem button key={index}>
                            <ChatBubbleOutlineIcon sx={{ marginRight: 1 }} />
                            <ListItemText primary={contact} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    )
}

export default Sidebar
