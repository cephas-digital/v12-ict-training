export interface IInputProps {
	value?: string;
	type?: string;
	onChange?: () => void;
	placeholder?: string;
	className?: string;
	icon?: string;
	name?: string;
	label?: string;
	readOnly?: boolean;
}