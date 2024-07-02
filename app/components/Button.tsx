import Link from "next/link";
import { IconType } from "react-icons";
import { MouseEventHandler } from "react";

interface ButtonProps {
    text: string;
    Icon?: IconType;
    href?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    withAnchor?: boolean;
    external?: boolean;
}

export const Button = ({ text, Icon, href, handleClick, withAnchor, external }: ButtonProps) => {

    const tailwind = `
    relative z-0 flex items-center gap-2 overflow-hidden rounded border-[1px] 
    border-blue-700 px-4 py-2 font-bold
    uppercase text-blue-700 transition-all duration-500
    
    before:absolute before:inset-0
    before:-z-10 before:translate-x-[150%]
    before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-blue-700
    before:transition-transform before:duration-1000
    before:content-[""]

    hover:scale-105 hover:text-neutral-300
    hover:before:translate-x-[0%]
    hover:before:translate-y-[0%]
    active:scale-95`;

    if (href) {
        return (
            withAnchor ?
                <a
                    href={href}
                    className={tailwind}
                    target={external ? "_blank" : "_self"}
                >
                    {Icon && <Icon />}
                    <span>{text}</span>
                </a> :
                <Link
                    href={href}
                    className={tailwind}
                    target={external ? "_blank" : "_self"}
                >
                    {Icon && <Icon />}
                    <span>{text}</span>
                </Link>
        )
    }

    return (
        <button className={tailwind} onClick={handleClick}>
            {Icon && <Icon />}
            <span>{text}</span>
        </button>
    );
};

export default Button;