"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InviteSkeleton } from "@/components/loaders/InviteSkeleton";
import { cn } from "@/lib/utils";
import { getApiErrorStatus, handleApiError } from "@/lib/api/handle-error";
import {
  INVITE_ACCEPT_LABEL,
  INVITE_ACCEPTING_LABEL,
  INVITE_ALREADY_BODY,
  INVITE_ALREADY_CTA,
  INVITE_ALREADY_HEADING,
  INVITE_DECLINE_LABEL,
  INVITE_ERROR_BODY,
  INVITE_ERROR_CTA,
  INVITE_ERROR_HEADING,
  INVITE_EXPIRED_BODY,
  INVITE_EXPIRED_CTA,
  INVITE_EXPIRED_HEADING,
  INVITE_EXPIRY_DAYS,
  INVITE_EXPIRY_PRE,
  INVITE_HEADING_POST,
  INVITE_HEADING_PRE,
  INVITE_INVITER_SUFFIX,
  INVITE_PAGE_BRAND,
  INVITE_PAGE_HEADING,
  INVITE_ROLE_CLASS,
  INVITE_SUCCESS_BODY,
  INVITE_SUCCESS_CTA,
  INVITE_SUCCESS_HEADING,
} from "@/constants/members";
import { useAcceptInvite, useDeclineInvite, useInviteDetails } from "../hooks";
import { getExpiryDays } from "../utils";
import { OrgAvatar } from "@/components/OrgAvatar";
import { StatusCard } from "./StatusCard";

export const InviteAcceptClient = ({ token }: { token: string }) => {
  const router = useRouter();

  const { data: invite, isLoading, isError, error } = useInviteDetails(token);
  const acceptMutation = useAcceptInvite();
  const declineMutation = useDeclineInvite();

  const httpStatus = getApiErrorStatus(error);
  const isExpired = isError && httpStatus === 410;
  const isAlreadyMember = isError && httpStatus === 409;
  const isUnknownError = isError && !isExpired && !isAlreadyMember;

  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(token);
      router.push(`/${invite!.org_slug}`);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDecline = async () => {
    try {
      await declineMutation.mutateAsync(token);
    } catch (err) {
      handleApiError(err);
    } finally {
      router.push("/");
    }
  };

  const expiryDays = getExpiryDays();
  const roleBadgeClass =
    INVITE_ROLE_CLASS[invite?.role ?? ""] ?? INVITE_ROLE_CLASS["viewer"];

  return (
    <div className="inv-bg min-h-screen flex flex-col items-center justify-center py-10 px-5">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 [font-family:var(--font-display)] font-bold text-[19px] tracking-[-0.02em] text-(--text-0) mb-9"
      >
        <span className="inv-mark w-8 h-8 rounded-[9px] grid place-items-center text-white text-[17px] shrink-0 font-bold select-none">
          N
        </span>
        {INVITE_PAGE_BRAND}
      </Link>

      {/* Card */}
      <div className="inv-card w-full max-w-[440px] bg-(--bg-1) border border-border rounded-(--r-xl) text-center py-10 px-9">
        {isLoading && <InviteSkeleton />}

        {!token && !isLoading && (
          <StatusCard
            icon={<AlertCircle size={30} className="text-(--danger)" />}
            badgeClassName="inv-err-badge"
            heading={INVITE_ERROR_HEADING}
            body={INVITE_ERROR_BODY}
            cta={INVITE_ERROR_CTA}
            href="/"
          />
        )}

        {isExpired && (
          <StatusCard
            icon={<Clock size={30} className="text-(--danger)" />}
            badgeClassName="inv-err-badge"
            heading={INVITE_EXPIRED_HEADING}
            body={INVITE_EXPIRED_BODY}
            cta={INVITE_EXPIRED_CTA}
            href="/"
          />
        )}

        {isAlreadyMember && (
          <StatusCard
            icon={<UserCheck size={30} className="text-(--primary)" />}
            badgeClassName="inv-already-badge"
            heading={INVITE_ALREADY_HEADING}
            body={INVITE_ALREADY_BODY}
            cta={INVITE_ALREADY_CTA}
            href="/dashboard"
          />
        )}

        {isUnknownError && (
          <StatusCard
            icon={<AlertCircle size={30} className="text-(--danger)" />}
            badgeClassName="inv-err-badge"
            heading={INVITE_ERROR_HEADING}
            body={INVITE_ERROR_BODY}
            cta={INVITE_ERROR_CTA}
            href="/"
          />
        )}

        {acceptMutation.isSuccess && invite && (
          <StatusCard
            icon={<CheckCircle2 size={30} className="text-(--ok)" />}
            badgeClassName="inv-ok-badge"
            heading={INVITE_SUCCESS_HEADING}
            body={`${INVITE_SUCCESS_BODY} ${invite.org_name}.`}
            cta={INVITE_SUCCESS_CTA}
            href={`/${invite.org_slug}`}
          />
        )}

        {invite && !acceptMutation.isSuccess && (
          <>
            {/* Org avatar */}
            <div className="flex justify-center mb-5">
              <OrgAvatar name={invite.org_name} shadow />
            </div>

            {/* Eyebrow */}
            <p className="text-[12.5px] font-bold tracking-[.08em] uppercase text-(--primary) mb-2.5">
              {INVITE_PAGE_HEADING}
            </p>

            {/* Heading */}
            <h1 className="[font-family:var(--font-display)] text-[24px] font-semibold tracking-[-0.02em] leading-[1.3] text-(--text-0) mb-1.5">
              {INVITE_HEADING_PRE}{" "}
              <b className="text-(--primary)">{invite.org_name}</b>{" "}
              {INVITE_HEADING_POST}
            </h1>

            {/* Inviter line */}
            <p className="text-[14.5px] text-(--text-1) leading-[1.55] mb-1.5">
              <b className="font-semibold text-(--text-0)">
                {invite.inviter_name}
              </b>{" "}
              {INVITE_INVITER_SUFFIX}
            </p>

            {/* Role badge */}
            <div className="mb-6 mt-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[.02em] px-3 py-1 rounded-full",
                  roleBadgeClass,
                )}
              >
                {invite.role}
              </span>
            </div>

            {/* Email pill */}
            {invite.email && (
              <div className="flex justify-center mb-7">
                <span className="inline-flex items-center gap-2 [font-family:var(--font-mono)] text-[12.5px] text-(--text-1) bg-(--bg-2) border border-border px-3.5 py-[7px] rounded-(--r-md)">
                  <Mail size={14} />
                  {invite.email}
                </span>
              </div>
            )}

            <div className="flex gap-2.5">
              <Button
                variant="ghost"
                className="flex-1 py-3.5 text-[15px] font-semibold bg-transparent text-(--text-1) hover:bg-(--bg-2) hover:text-(--text-0)"
                onClick={handleDecline}
                disabled={acceptMutation.isPending || declineMutation.isPending}
              >
                {INVITE_DECLINE_LABEL}
              </Button>
              <Button
                variant="primary"
                className="flex-1 py-3.5 text-[15px] font-semibold"
                onClick={handleAccept}
                disabled={acceptMutation.isPending || declineMutation.isPending}
              >
                {acceptMutation.isPending
                  ? INVITE_ACCEPTING_LABEL
                  : INVITE_ACCEPT_LABEL}
              </Button>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-5 pt-5 border-t border-border text-[12px] text-(--text-3)">
              <Clock size={13} className="shrink-0" />
              {INVITE_EXPIRY_PRE} {expiryDays} {INVITE_EXPIRY_DAYS}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
