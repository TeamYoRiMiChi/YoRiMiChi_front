import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { withdrawMembership } from "../../../api/MyPage/profileApi";
import { logout } from "../../../features/auth/authSlice";

function useMembershipWithdrawal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleAgreementChange = (event) => {
        setIsAgreed(event.target.checked);
    };

    const handleWithdraw = async () => {
        if (!isAgreed || isSubmitting) {
            return;
        }

        const confirmed = window.confirm(
            "本当に退会しますか？この操作は取り消せません。"
        );

        if (!confirmed) {
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            await withdrawMembership();

            dispatch(logout());

            window.alert("退会処理が完了しました。");

            navigate("/login", {
                replace: true,
            });
        } catch (err) {
            setError(
                err.response?.data?.message ??
                "退会処理に失敗しました。"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isAgreed,
        isSubmitting,
        error,
        handleAgreementChange,
        handleWithdraw,
    };
}

export default useMembershipWithdrawal;