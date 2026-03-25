import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  JobType as BackendJobType,
  ContactSubmission,
  ContentBlock,
  JobListing,
  ProductListing,
} from "../backend.d.ts";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export enum JobType {
  contract = "contract",
  partTime = "partTime",
  fullTime = "fullTime",
}

export type { JobListing, ProductListing, ContentBlock, ContactSubmission };

// ── Queries ─────────────────────────────────────────────────────────────

export function useActiveJobListings() {
  const { actor, isFetching } = useActor();
  return useQuery<JobListing[]>({
    queryKey: ["activeJobListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveJobListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useActiveProductListings() {
  const { actor, isFetching } = useActor();
  return useQuery<ProductListing[]>({
    queryKey: ["activeProductListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveProductListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllJobListings() {
  const { actor, isFetching } = useActor();
  return useQuery<JobListing[]>({
    queryKey: ["allJobListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllJobListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProductListings() {
  const { actor, isFetching } = useActor();
  return useQuery<ProductListing[]>({
    queryKey: ["allProductListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProductListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllContentBlocks() {
  const { actor, isFetching } = useActor();
  return useQuery<ContentBlock[]>({
    queryKey: ["allContentBlocks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContentBlocks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactSubmission[]>({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

// Any signed-in (non-anonymous) user is treated as admin
export function useIsCallerAdmin() {
  const { identity } = useInternetIdentity();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) return false;
      return !identity.getPrincipal().isAnonymous();
    },
    enabled: true,
  });
}

// ── Mutations ────────────────────────────────────────────────────────────

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string | null;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(name, email, phone, message);
    },
  });
}

export function useUpdateContentBlock() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      page,
      section,
      value,
    }: {
      page: string;
      section: string;
      value: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateContentBlock(page, section, value);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allContentBlocks"] }),
  });
}

export function useSeedDefaultContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.seedDefaultContent();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allContentBlocks"] }),
  });
}

export function useCreateJobListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      department: string;
      location: string;
      jobType: JobType;
      description: string;
      requirements: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createJobListing(
        data.title,
        data.department,
        data.location,
        data.jobType as unknown as BackendJobType,
        data.description,
        data.requirements,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allJobListings"] });
      qc.invalidateQueries({ queryKey: ["activeJobListings"] });
    },
  });
}

export function useUpdateJobListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      department: string;
      location: string;
      jobType: JobType;
      description: string;
      requirements: string[];
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateJobListing(
        data.title,
        data.department,
        data.location,
        data.jobType as unknown as BackendJobType,
        data.description,
        data.requirements,
        data.isActive,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allJobListings"] });
      qc.invalidateQueries({ queryKey: ["activeJobListings"] });
    },
  });
}

export function useCreateProductListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      tagline: string;
      description: string;
      features: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createProductListing(
        data.name,
        data.tagline,
        data.description,
        data.features,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allProductListings"] });
      qc.invalidateQueries({ queryKey: ["activeProductListings"] });
    },
  });
}

export function useUpdateProductListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      tagline: string;
      description: string;
      features: string[];
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProductListing(
        data.name,
        data.tagline,
        data.description,
        data.features,
        data.isActive,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allProductListings"] });
      qc.invalidateQueries({ queryKey: ["activeProductListings"] });
    },
  });
}
