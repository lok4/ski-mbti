"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { PersonalityType } from "@/types";
import { CheckCircle, AlertCircle } from "lucide-react";
import { TextInput, Checkbox } from "@mantine/core";
import { supabase } from "@/lib/supabaseClient";

const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

const formSchema = z.object({
    name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
    phone: z.string().regex(phoneRegex, { message: "올바른 휴대전화 번호를 입력해주세요." }),
    resultType: z.string(),
    marketingConsent: z.boolean().refine((val) => val === true || val === false, {
        message: "마케팅 정보 동의 여부를 확인해주세요.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadFormProps {
    resultType: PersonalityType;
}

export default function LeadForm({ resultType }: LeadFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            resultType: resultType,
            marketingConsent: true,
        },
    });

    const onSubmit = async (data: FormValues) => {
        setStatus("loading");
        try {
            const { error } = await supabase
                .from("leads")
                .insert([
                    {
                        name: data.name,
                        phone: data.phone,
                        result_type: data.resultType,
                        marketing_consent: data.marketingConsent,
                        created_at: new Date().toISOString(),
                    },
                ]);

            if (error) throw error;

            setStatus("success");
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            setErrorMessage("상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    if (status === "success") {
        return (
            <div className="w-full max-w-md mx-auto mt-8 p-8 bg-green-50 rounded-2xl border border-green-100 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">신청 완료!</h3>
                <p className="text-green-700">
                    전문 강사님이 곧 연락드릴 예정입니다.<br />
                    조금만 기다려주세요!
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                    우리 아이 성향에 딱 맞는 강습 상담받기
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    전문가가 결과를 분석하여 최적의 커리큘럼을 제안해드립니다.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label="이름"
                            placeholder="홍길동"
                            error={errors.name?.message}
                            size="md"
                            radius="md"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label="연락처"
                            placeholder="010-1234-5678"
                            error={errors.phone?.message}
                            size="md"
                            radius="md"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="marketingConsent"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                        <Checkbox
                            label={
                                <span className="text-xs text-gray-500">
                                    (선택) 할인 혜택 및 강습 정보 알림 동의<br />
                                    <span className="text-gray-400 text-[10px]">
                                        * 체크 해제 시 이벤트 혜택 적용이 어려울 수 있습니다.
                                    </span>
                                </span>
                            }
                            checked={value}
                            onChange={(event) => onChange(event.currentTarget.checked)}
                            error={errors.marketingConsent?.message}
                            size="sm"
                            {...field}
                        />
                    )}
                />

                <input type="hidden" {...register("resultType")} />

                {status === "error" && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errorMessage}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 mt-2"
                    isLoading={status === "loading"}
                >
                    무료 상담 신청하기
                </Button>

                <p className="text-xs text-center text-gray-400 mt-4">
                    개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
                </p>
            </form>
        </div>
    );
}
