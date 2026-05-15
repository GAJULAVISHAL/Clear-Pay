import { SendCard } from "../../components/sendCard";

export default function P2PTransferPage() {
    return (
        <div className="w-full ">
            <h1 className="text-2xl font-semibold text-[#1b1b1f]">P2P Transfer</h1>
            <p className="text-gray-600 mt-2">Easily transfer money to your friends and family with our P2P transfer feature. Send money directly from your account to theirs in just a few clicks.</p>
            <div className="w-[30%]">
                <SendCard/>
            </div>
        </div>
    )
}