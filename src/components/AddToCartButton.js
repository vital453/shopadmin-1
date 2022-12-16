import { CreateAnimation, IonButton, IonIcon } from '@ionic/react';
import { useRef, useState } from 'react';

import styles from "./AddToCartButton.module.css";
import { cartOutline, checkmarkDoneOutline, checkmarkOutline } from "ionicons/icons";

const AddToCartButton = ({ icon = true, color, customOnClick = null }) => {

	const iconRef = useRef();
	const [hidden, setHidden] = useState(true);

	const floatStyle = {

		display: hidden ? "none" : "",
		position: "absolute"
	};

	const floatGrowAnimation = {

		property: "transform",
		fromValue: "translateY(0) scale(1)",
		toValue: "translateY(-55px) scale(1.2)"
	};

	const colorAnimation = {

		property: "color",
		fromValue: "white",
		toValue: color? `var(--ion-color-danger)` : `var(--ion-color-success)`
	};

	const mainAnimation = {

		duration: 700,
		iterations: "1",
		fromTo: [floatGrowAnimation, colorAnimation],
		easing: "cubic-bezier(0.25, 0.7, 0.25, 0.7)"
	};

	const handleClick = async () => {

		setHidden(false);
		await iconRef.current.animation.play();
		setHidden(true);
		customOnClick && customOnClick();
	}

	return (
		<div className={styles.buttonContainer}>
			<IonButton color={color ? "danger" : "success" } className={styles.button} onClick={handleClick}>
				{!icon && "Add to cart"}
				{icon && <IonIcon icon={checkmarkOutline} />}

			</IonButton>
			<CreateAnimation ref={iconRef} {...mainAnimation}>
				<IonIcon icon={checkmarkOutline} size="small" style={floatStyle} />
			</CreateAnimation>


		</div>
	);
}

export default AddToCartButton;