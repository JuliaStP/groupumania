import React from "react";
import { Link } from "react-router-dom";

// Icons
import like from "../assets/thumbs-up-solid.svg";
import dislike from "../assets/thumbs-down-solid.svg";
import comment from "../assets/comment-regular.svg";
import comments from "../assets/comments-regular.svg";

// Styles
import styles from "../styles/PostBtn.css";


const PostBtn = (props) => {
    let reactionColor = "";

    switch (props.reaction) {
        case "like":
            reactionColor = "icon_green";
            break;
        case "dislike":
            reactionColor = "icon_red";
            break;
        case null:
            reactionColor = "";
            break;
        default:
            console.log("Something went wrong with reactionColor in ReactionBtn Component");
    }

    let icon;
    switch (props.icon) {
        case "like":
            icon = like;
            break;
        case "dislike":
            icon = dislike;
            break;
        case "comment":
            icon = comment;
            break;
        case "comments":
            icon = comments;
            break;
        default:
            console.log("Something went wrong with icon in ReactionBtn Component");
    }

    let btn;
    switch (props.btnType) {
        case "functional":
            btn = (
                <button
                    name={props.name}
                    className={`${styles.reaction_btn} ${props.styling}`}
                    onClick={props.onReaction}
                >
                    <img className={`${styles.icon} ${reactionColor}`} src={icon} alt="" />
                    <span>{props.text}</span>
                </button>
            );
            break;
        case "link":
            btn = (
                <Link to={props.link} className={`${styles.reaction_btn} ${props.styling}`}>
                    <img className={`${styles.icon} ${reactionColor}`} src={icon} alt="" />
                    <span>{props.text}</span>
                </Link>
            );
            break;
        case "decor":
            btn = (
                <div className={`${styles.reaction_btn} ${props.styling}`}>
                    <img className={`${styles.icon} ${reactionColor}`} src={icon} alt="" />
                    <span>{props.text}</span>
                </div>
            );
            break;
        default:
            console.log("Something went wrong with btn");
    }

    return <>{btn}</>;
};

export default PostBtn;