import React from "react";
import { Col } from "react-bootstrap";

const SizeGuide = () => {
	return (
		<Col>
			<h4>Size Guide</h4>
			<p>
				Choosing the right size ensures a comfortable fit. Refer to our size
				guide below:
			</p>
			<h5>Women's Clothing:</h5>
			<ul>
				<li>S: Bust 33-34", Waist 25-26", Hips 35-36"</li>
				<li>M: Bust 35-36", Waist 27-28", Hips 37-38"</li>
				<li>L: Bust 37-39", Waist 29-31", Hips 39-41"</li>
				<li>XL: Bust 40-42", Waist 32-34", Hips 42-44"</li>
				<li>XXL: Bust 43-45", Waist 35-37", Hips 45-47"</li>
			</ul>
			<h5>Men's Clothing:</h5>
			<ul>
				<li>S: Chest 36-38", Waist 30-32"</li>
				<li>M: Chest 38-40", Waist 32-34"</li>
				<li>L: Chest 40-42", Waist 34-36"</li>
				<li>XL: Chest 42-44", Waist 36-38"</li>
				<li>XXL: Chest 45-47", Waist 39-41"</li>
			</ul>
			<h5>Caps:</h5>
			<ul>
				<li>S: Fits head circumference up to 22"</li>
				<li>M: Fits head circumference 22" - 23"</li>
				<li>L: Fits head circumference 23" - 24"</li>
				<li>XL: Fits head circumference 24" - 25"</li>
				<li>XXL: Fits head circumference 25" and above</li>
			</ul>
			<h5>Bags:</h5>
			<ul>
				<li>S: Height 10", Width 8", Depth 4"</li>
				<li>M: Height 12", Width 10", Depth 5"</li>
				<li>L: Height 14", Width 12", Depth 6"</li>
				<li>XL: Height 16", Width 14", Depth 7"</li>
				<li>XXL: Height 18", Width 16", Depth 8"</li>
			</ul>
		</Col>
	);
};

export default SizeGuide;
