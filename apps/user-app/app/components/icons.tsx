import React from "react"

type IconProps = {
    className?: string
}

export const DashboardIcon = ({ className = "h-5 w-5" }: IconProps) => (
    <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="5" rx="2" />
        <rect x="13" y="10" width="8" height="11" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
)

export const TransactionsIcon = ({ className = "h-5 w-5" }: IconProps) => (
    <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 7h12" />
        <path d="M13 4l3 3-3 3" />
        <path d="M20 17H8" />
        <path d="M11 14l-3 3 3 3" />
    </svg>
)

export const TransferIcon = ({ className = "h-5 w-5" }: IconProps) => (
    <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20 4L4 11l6 2 2 6 8-15z" />
        <path d="M10 13l10-9" />
    </svg>
)
