"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Loader2 } from "lucide-react";

export function SubmitButton({ children, ...props }) {
    const { formState } = useFormContext(); // Get form state

    return (
        <Button type="submit" disabled={formState.isSubmitting} {...props}>
            {formState.isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-16 w-16 animate-spin" />
                    Processing...
                </>
            ) : (
                children
            )}
        </Button>
    );
}
