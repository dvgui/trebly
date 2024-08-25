import {
    MiniKit,
    tokenToDecimals,
    Tokens,
    PayCommandInput,
    ResponseEvent,
    MiniAppPaymentPayload,
} from '@worldcoin/minikit-js';
import { useEffect, useState } from 'react';

interface sendPaymentProps {
    amount: number;
    currency: string;
    destination: string;
}

export const usePayment = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const sendPayment = async (props: sendPaymentProps) => {
        setIsProcessing(true);
        try {
            const res = await fetch('/api/initiate-payment', {
                method: 'POST',
            });
            const { id } = await res.json();

            console.log(id);

            const { amount, currency, destination } = props;
            const currencySymbol =
                currency === 'USDC' ? Tokens.USDCE : Tokens.WLD;

            const payload: PayCommandInput = {
                reference: id,
                to: destination,
                tokens: [
                    {
                        symbol: currencySymbol,
                        token_amount: tokenToDecimals(
                            amount,
                            currencySymbol
                        ).toString(),
                    },
                ],
                description: ':)',
            };
            console.log('Payment to send', payload);
            if (MiniKit.isInstalled()) {
                MiniKit.commands.pay(payload);
            } else {
                console.error('MiniKit is not installed');
            }
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    useEffect(() => {
        if (!MiniKit.isInstalled()) {
            console.error('MiniKit is not installed');
            return;
        }

        const handlePaymentResponse = async (
            response: MiniAppPaymentPayload
        ) => {
            console.log(response);
            if (response.status === 'success') {
                const res = await fetch(`/api/confirm-payment`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ payload: response }),
                });
                const payment = await res.json();

                console.log('payment response', payment); // debug

                if (payment.success) {
                    setIsPaid(true);
                } else {
                    setIsPaid(false);
                }
                setIsProcessing(false);
            }
            if (response.status === 'error') {
                setIsPaid(false);
                setIsProcessing(false);
                console.log(response.error_code);
            }
        };

        MiniKit.subscribe(ResponseEvent.MiniAppPayment, handlePaymentResponse);

        return () => {
            MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
        };
    }, []);

    return {
        sendPayment,
        isPaid,
        isProcessing,
    };
};
