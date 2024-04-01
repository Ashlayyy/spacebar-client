import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { BannerContext } from "../contexts/BannerContext";
import useLogger from "../hooks/useLogger";
import Icon from "./Icon";
import IconButton from "./IconButton";

const Container = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CloseWrapper = styled(IconButton)`
	position: absolute;
	right: 1%;
`;

function Banner() {
	const logger = useLogger("Banner");
	const bannerContext = React.useContext(BannerContext);

	if (!bannerContext.content) return null;

	return (
		<AnimatePresence>
			<Container
				variants={{
					show: {
						// slide down
						y: 0,
						transition: {
							delayChildren: 0.3,
							staggerChildren: 0.2,
						},
					},
					hide: {
						// slide up
						y: "-100%",
						transition: {
							delayChildren: 0.3,
							staggerChildren: 0.2,
						},
					},
				}}
				initial="hide"
				animate="show"
				exit="hide"
				onAnimationComplete={() => {
					logger.debug("animation complete");
				}}
				style={bannerContext.content.style}
			>
				{bannerContext.content.element}
				{!bannerContext.content.forced && (
					<CloseWrapper
						onClick={() => {
							bannerContext.close();
						}}
					>
						<Icon icon="mdiClose" color="var(--text)" size="24px" />
					</CloseWrapper>
				)}
			</Container>
		</AnimatePresence>
	);
}

export default Banner;
