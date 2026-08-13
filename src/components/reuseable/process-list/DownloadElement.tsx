import clsx from "clsx";
import Link from "next/link";

// ==============================================================
interface DownloadListProps {
    title: string;
    link1: string;
    shadow?: boolean;
    className?: string;
}
// ==============================================================

export default function DownloadElement({ title, className = '', shadow, link1 }: DownloadListProps) {
    return (
        <>
            <div
                className={clsx({
                    card: true,
                    "shadow-lg": shadow,
                    [className]: Boolean(className)
                })}>
                <div className="card-body p-3 p-md-6">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div className="grow-1 w-75 pe-3">
                            <h4 className="mb-1 text-start">{title}</h4>
                        </div>
                        <div className="d-flex">
                            <Link href={`${link1}`} >
                                <span className="icon btn btn-circle btn-lg btn-soft-primary pe-none me-2 me-md-4">
                                    <span className="number"><i className="uil uil-file-download fs-40"></i></span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
