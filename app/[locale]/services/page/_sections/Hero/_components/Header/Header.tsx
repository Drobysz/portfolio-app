import s from "./style.module.scss";

export const Header = ()=> {
    return (
        <header className="pt-10 pl-10 max-[995px]:pt-4 max-[400px]:pl-0">
            <div className={s.header_container}>
                <h1 className={s.title}>
                    I offer a wide range
                </h1>
                <p className={s.subtitle}>
                    of services to help you achieve your goals.
                </p>
            </div>
        </header>
    )
}