import React from "react"; // Ensure React is imported
import { VscSearchStop } from "react-icons/vsc";
import { TfiWrite } from "react-icons/tfi";
import { TbFilterOff } from "react-icons/tb";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ").filter(Boolean); // Remove empty values
    let initials = "";

    for (let index = 0; index < Math.min(words.length, 2); index++) {
        initials += words[index][0];
    }

    return initials.toUpperCase();
};

export const getEmptyCardMessage = (filterType) => {
    switch (filterType) {
        case "search":
            return "Oops! No stories found matching your search.";
        case "date":
            return "No stories found in the given date range.";
        default:
            return "Start creating your first Travel Story! Click 'Add' Button to jot down your thoughts, ideas, and memories. Let's get started!";
    }
};

// Use React.createElement instead of JSX
export const getEmptyCardIcon = (filterType) => {
    switch (filterType) {
        case "search":
            return React.createElement(VscSearchStop, { className: "text-[3rem] text-cyan-600" });
        case "date":
            return React.createElement(TbFilterOff, { className: "text-[3rem] text-cyan-600" });
        default:
            return React.createElement(TfiWrite, { className: "text-[3rem] text-cyan-600" });
    }
};
