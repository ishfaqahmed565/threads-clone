"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

export default function PostThread({ userId }: { userId: string }) {
	const router = useRouter();
	const pathname = usePathname();
	const form = useForm<z.infer<typeof ThreadValidation>>({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: "",
			accountId: userId,
		},
	});
	const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
		try {
			await createThread({
				text: values.thread,
				author: userId,
				community: null,
				path: pathname,
			});
			router.push("/");
		} catch (error: any) {
			throw new Error(
				`Something went wrong while creating thread ${error.message}`
			);
		}
	};
	return (
		<Form {...form}>
			<form
				className="flex flex-col justify-start gap-10 mt-10"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3">
							<FormLabel className="text-base-semibold text-light-2">
								Content
							</FormLabel>
							<FormControl>
								<Textarea
									rows={10}
									className="no-focus border border-dark-4 bg-dark-3 text-light-1"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="bg-primary-500 w-full ">
					Submit
				</Button>
			</form>
		</Form>
	);
}
