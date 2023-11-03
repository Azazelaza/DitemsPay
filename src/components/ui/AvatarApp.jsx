import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Image, Spinner } from "react-bootstrap";

export const AvatarApp = ({
    img = null,
    textToGenerateAvatar,
    size = 40,
    maxHeight = 300,
    width = "100%",
    roundedCircle = true
}) => {
    const [loading, setLoading] = useState(true);

    const imageLoaded = () => {
        setLoading(false);
    };

    const styleAvatar = {
        marginRight: 10,
        marginLeft: 10,
        height: maxHeight,
        // width,
        objectFit: "contain"
    };

    return (
        <Fragment>
            {loading && <Spinner animation="grow" style={styleAvatar} />}

            <Image
                src={
                    img
                        ? img
                        : `https://ui-avatars.com/api/?name=${textToGenerateAvatar}&size=${size}&background=random&color=#FFFFFF`
                }
                roundedCircle={roundedCircle}
                alt={textToGenerateAvatar}
                onLoad={imageLoaded}
                style={{
                    ...styleAvatar,
                    display: loading ? "none" : "initial"
                }}
            />
        </Fragment>
    );
};

AvatarApp.propTypes = {
    img: PropTypes.string,
    textToGenerateAvatar: PropTypes.string,
    size: PropTypes.number,
    maxHeight: PropTypes.number
};
