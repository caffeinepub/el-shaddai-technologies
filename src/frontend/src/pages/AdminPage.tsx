import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Database,
  Edit,
  Loader2,
  Lock,
  Mail,
  Package,
  Plus,
  Settings,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  type ContentBlock,
  type JobListing,
  JobType,
  type ProductListing,
  useAllContentBlocks,
  useAllJobListings,
  useAllProductListings,
  useContactSubmissions,
  useCreateJobListing,
  useCreateProductListing,
  useIsCallerAdmin,
  useSeedDefaultContent,
  useUpdateContentBlock,
  useUpdateJobListing,
  useUpdateProductListing,
} from "../hooks/useQueries";

// ── Helpers ───────────────────────────────────────────────────────────────

function jobTypeLabel(jt: JobType): string {
  switch (jt) {
    case JobType.fullTime:
      return "Full-Time";
    case JobType.partTime:
      return "Part-Time";
    case JobType.contract:
      return "Contract";
    default:
      return String(jt);
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ContentTab() {
  const { data: blocks, isLoading } = useAllContentBlocks();
  const updateBlock = useUpdateContentBlock();
  const seedContent = useSeedDefaultContent();
  const [editing, setEditing] = useState<ContentBlock | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (block: ContentBlock) => {
    setEditing(block);
    setEditValue(block.value);
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      await updateBlock.mutateAsync({
        page: editing.page,
        section: editing.section,
        value: editValue,
      });
      toast.success("Content block updated");
      setEditing(null);
    } catch {
      toast.error("Failed to update content block");
    }
  };

  const handleSeed = async () => {
    try {
      await seedContent.mutateAsync();
      toast.success("Default content seeded successfully");
    } catch {
      toast.error("Failed to seed default content");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-brand-navy">
            Content Blocks
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage page content across the site
          </p>
        </div>
        <Button
          onClick={handleSeed}
          disabled={seedContent.isPending}
          variant="outline"
          className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-display font-semibold gap-2"
          data-ocid="admin.content.seed.button"
        >
          {seedContent.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Database size={14} />
          )}
          Seed Default Content
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-2" data-ocid="admin.content.loading_state">
          {Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )}

      {!isLoading && blocks && blocks.length === 0 && (
        <div
          className="text-center py-12 bg-muted/30 rounded-xl"
          data-ocid="admin.content.empty_state"
        >
          <p className="text-muted-foreground mb-4">No content blocks found.</p>
          <Button
            onClick={handleSeed}
            className="bg-brand-navy text-white font-display font-semibold"
          >
            Seed Default Content
          </Button>
        </div>
      )}

      {!isLoading && blocks && blocks.length > 0 && (
        <div
          className="border rounded-xl overflow-hidden"
          data-ocid="admin.content.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-light">
                <TableHead className="font-display font-semibold text-brand-navy">
                  Page
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Section
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Value
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy w-20">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocks.map((block, i) => (
                <TableRow
                  key={`${block.page}-${block.section}`}
                  data-ocid={`admin.content.row.${i + 1}`}
                >
                  <TableCell className="font-medium capitalize">
                    {block.page}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {block.section}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {block.value}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(block)}
                          className="text-brand-navy hover:bg-brand-navy/10"
                          data-ocid={`admin.content.edit_button.${i + 1}`}
                        >
                          <Edit size={14} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent data-ocid="admin.content.edit.dialog">
                        <DialogHeader>
                          <DialogTitle className="font-display text-brand-navy">
                            Edit Content Block
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-display font-medium">
                              Page / Section
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {editing?.page} → {editing?.section}
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-sm font-display font-medium">
                              Value
                            </Label>
                            <Textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="min-h-28"
                              data-ocid="admin.content.edit.textarea"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleSave}
                            disabled={updateBlock.isPending}
                            className="bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold gap-2"
                            data-ocid="admin.content.edit.save_button"
                          >
                            {updateBlock.isPending ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : null}
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function JobsTab() {
  const { data: jobs, isLoading } = useAllJobListings();
  const createJob = useCreateJobListing();
  const updateJob = useUpdateJobListing();
  const [showCreate, setShowCreate] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);

  const emptyJobForm = {
    title: "",
    department: "",
    location: "",
    jobType: JobType.fullTime,
    description: "",
    requirements: "",
    isActive: true,
  };
  const [jobForm, setJobForm] = useState(emptyJobForm);

  const resetForm = () => {
    setJobForm(emptyJobForm);
    setShowCreate(false);
    setEditingJob(null);
  };

  const handleEditJob = (job: JobListing) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      jobType: job.jobType,
      description: job.description,
      requirements: job.requirements.join(", "),
      isActive: job.isActive,
    });
    setShowCreate(true);
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const reqs = jobForm.requirements
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);
    try {
      if (editingJob) {
        await updateJob.mutateAsync({
          ...jobForm,
          requirements: reqs,
        });
        toast.success("Job listing updated");
      } else {
        await createJob.mutateAsync({
          ...jobForm,
          requirements: reqs,
        });
        toast.success("Job listing created");
      }
      resetForm();
    } catch {
      toast.error("Failed to save job listing");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-brand-navy">
            Job Listings
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage open positions and visibility
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowCreate(true);
          }}
          className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-semibold gap-2"
          data-ocid="admin.jobs.create.open_modal_button"
        >
          <Plus size={14} /> New Job
        </Button>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={showCreate}
        onOpenChange={(open) => {
          if (!open) resetForm();
        }}
      >
        <DialogContent
          className="max-w-lg"
          data-ocid="admin.jobs.create.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-brand-navy">
              {editingJob ? "Edit Job Listing" : "Create Job Listing"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitJob} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-display font-medium">
                  Job Title *
                </Label>
                <Input
                  required
                  value={jobForm.title}
                  onChange={(e) =>
                    setJobForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Senior React Developer"
                  data-ocid="admin.jobs.title.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-display font-medium">
                  Department *
                </Label>
                <Input
                  required
                  value={jobForm.department}
                  onChange={(e) =>
                    setJobForm((p) => ({ ...p, department: e.target.value }))
                  }
                  placeholder="Engineering"
                  data-ocid="admin.jobs.department.input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-display font-medium">
                  Location *
                </Label>
                <Input
                  required
                  value={jobForm.location}
                  onChange={(e) =>
                    setJobForm((p) => ({ ...p, location: e.target.value }))
                  }
                  placeholder="New York, NY"
                  data-ocid="admin.jobs.location.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-display font-medium">
                  Job Type *
                </Label>
                <Select
                  value={jobForm.jobType}
                  onValueChange={(v) =>
                    setJobForm((p) => ({ ...p, jobType: v as JobType }))
                  }
                >
                  <SelectTrigger data-ocid="admin.jobs.type.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={JobType.fullTime}>Full-Time</SelectItem>
                    <SelectItem value={JobType.partTime}>Part-Time</SelectItem>
                    <SelectItem value={JobType.contract}>Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-display font-medium">
                Description *
              </Label>
              <Textarea
                required
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Job description..."
                className="min-h-20"
                data-ocid="admin.jobs.description.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-display font-medium">
                Requirements (comma-separated)
              </Label>
              <Input
                value={jobForm.requirements}
                onChange={(e) =>
                  setJobForm((p) => ({ ...p, requirements: e.target.value }))
                }
                placeholder="React, TypeScript, 5+ years experience"
                data-ocid="admin.jobs.requirements.input"
              />
            </div>
            {editingJob && (
              <div className="flex items-center gap-3">
                <Switch
                  checked={jobForm.isActive}
                  onCheckedChange={(v) =>
                    setJobForm((p) => ({ ...p, isActive: v }))
                  }
                  data-ocid="admin.jobs.active.switch"
                />
                <Label className="text-sm font-display font-medium">
                  Active
                </Label>
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                data-ocid="admin.jobs.create.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createJob.isPending || updateJob.isPending}
                className="bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold gap-2"
                data-ocid="admin.jobs.create.submit_button"
              >
                {(createJob.isPending || updateJob.isPending) && (
                  <Loader2 size={14} className="animate-spin" />
                )}
                {editingJob ? "Update Job" : "Create Job"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading && (
        <div className="space-y-2" data-ocid="admin.jobs.loading_state">
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {!isLoading && jobs && jobs.length === 0 && (
        <div
          className="text-center py-12 bg-muted/30 rounded-xl"
          data-ocid="admin.jobs.empty_state"
        >
          <p className="text-muted-foreground">
            No job listings yet. Create your first one!
          </p>
        </div>
      )}

      {!isLoading && jobs && jobs.length > 0 && (
        <div
          className="border rounded-xl overflow-hidden"
          data-ocid="admin.jobs.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-light">
                <TableHead className="font-display font-semibold text-brand-navy">
                  Title
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Dept.
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Type
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Location
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Status
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy w-20">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job, i) => (
                <TableRow
                  key={`${job.title}-${i}`}
                  data-ocid={`admin.jobs.row.${i + 1}`}
                >
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {job.department}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-brand-navy/10 text-brand-navy border-0"
                    >
                      {jobTypeLabel(job.jobType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {job.location}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-xs border-0 ${job.isActive ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}
                    >
                      {job.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditJob(job)}
                      className="text-brand-navy hover:bg-brand-navy/10"
                      data-ocid={`admin.jobs.edit_button.${i + 1}`}
                    >
                      <Edit size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function ProductsTab() {
  const { data: products, isLoading } = useAllProductListings();
  const createProduct = useCreateProductListing();
  const updateProduct = useUpdateProductListing();
  const [showCreate, setShowCreate] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductListing | null>(
    null,
  );

  const emptyForm = {
    name: "",
    tagline: "",
    description: "",
    features: "",
    isActive: true,
  };
  const [pForm, setPForm] = useState(emptyForm);

  const resetForm = () => {
    setPForm(emptyForm);
    setShowCreate(false);
    setEditingProduct(null);
  };

  const handleEdit = (p: ProductListing) => {
    setEditingProduct(p);
    setPForm({
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      features: p.features.join(", "),
      isActive: p.isActive,
    });
    setShowCreate(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const feats = pForm.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ ...pForm, features: feats });
        toast.success("Product updated");
      } else {
        await createProduct.mutateAsync({ ...pForm, features: feats });
        toast.success("Product created");
      }
      resetForm();
    } catch {
      toast.error("Failed to save product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-brand-navy">
            Products
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage product and solution listings
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowCreate(true);
          }}
          className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-semibold gap-2"
          data-ocid="admin.products.create.open_modal_button"
        >
          <Plus size={14} /> New Product
        </Button>
      </div>

      <Dialog
        open={showCreate}
        onOpenChange={(open) => {
          if (!open) resetForm();
        }}
      >
        <DialogContent
          className="max-w-lg"
          data-ocid="admin.products.create.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-brand-navy">
              {editingProduct ? "Edit Product" : "Create Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-display font-medium">
                Product Name *
              </Label>
              <Input
                required
                value={pForm.name}
                onChange={(e) =>
                  setPForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="TalentTrack Pro"
                data-ocid="admin.products.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-display font-medium">
                Tagline
              </Label>
              <Input
                value={pForm.tagline}
                onChange={(e) =>
                  setPForm((p) => ({ ...p, tagline: e.target.value }))
                }
                placeholder="AI-powered talent matching platform"
                data-ocid="admin.products.tagline.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-display font-medium">
                Description *
              </Label>
              <Textarea
                required
                value={pForm.description}
                onChange={(e) =>
                  setPForm((p) => ({ ...p, description: e.target.value }))
                }
                className="min-h-20"
                placeholder="Product description..."
                data-ocid="admin.products.description.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-display font-medium">
                Features (comma-separated)
              </Label>
              <Input
                value={pForm.features}
                onChange={(e) =>
                  setPForm((p) => ({ ...p, features: e.target.value }))
                }
                placeholder="AI matching, Real-time analytics, ATS integration"
                data-ocid="admin.products.features.input"
              />
            </div>
            {editingProduct && (
              <div className="flex items-center gap-3">
                <Switch
                  checked={pForm.isActive}
                  onCheckedChange={(v) =>
                    setPForm((p) => ({ ...p, isActive: v }))
                  }
                  data-ocid="admin.products.active.switch"
                />
                <Label className="text-sm font-display font-medium">
                  Active
                </Label>
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                data-ocid="admin.products.create.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createProduct.isPending || updateProduct.isPending}
                className="bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold gap-2"
                data-ocid="admin.products.create.submit_button"
              >
                {(createProduct.isPending || updateProduct.isPending) && (
                  <Loader2 size={14} className="animate-spin" />
                )}
                {editingProduct ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading && (
        <div className="space-y-2" data-ocid="admin.products.loading_state">
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {!isLoading && products && products.length === 0 && (
        <div
          className="text-center py-12 bg-muted/30 rounded-xl"
          data-ocid="admin.products.empty_state"
        >
          <p className="text-muted-foreground">
            No products yet. Add your first one!
          </p>
        </div>
      )}

      {!isLoading && products && products.length > 0 && (
        <div
          className="border rounded-xl overflow-hidden"
          data-ocid="admin.products.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-light">
                <TableHead className="font-display font-semibold text-brand-navy">
                  Name
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Tagline
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Status
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy w-20">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, i) => (
                <TableRow
                  key={`${product.name}-${i}`}
                  data-ocid={`admin.products.row.${i + 1}`}
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {product.tagline}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-xs border-0 ${product.isActive ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(product)}
                      className="text-brand-navy hover:bg-brand-navy/10"
                      data-ocid={`admin.products.edit_button.${i + 1}`}
                    >
                      <Edit size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function SubmissionsTab() {
  const { data: submissions, isLoading } = useContactSubmissions();

  const formatDate = (ts: bigint) => {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-bold text-lg text-brand-navy">
          Contact Submissions
        </h3>
        <p className="text-sm text-muted-foreground">
          Review messages from the contact form
        </p>
      </div>

      {isLoading && (
        <div className="space-y-2" data-ocid="admin.submissions.loading_state">
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {!isLoading && submissions && submissions.length === 0 && (
        <div
          className="text-center py-12 bg-muted/30 rounded-xl"
          data-ocid="admin.submissions.empty_state"
        >
          <Mail size={28} className="mx-auto text-muted-foreground/40 mb-2" />
          <p className="text-muted-foreground">No contact submissions yet.</p>
        </div>
      )}

      {!isLoading && submissions && submissions.length > 0 && (
        <div
          className="border rounded-xl overflow-hidden"
          data-ocid="admin.submissions.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-light">
                <TableHead className="font-display font-semibold text-brand-navy">
                  Name
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Email
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Phone
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Message
                </TableHead>
                <TableHead className="font-display font-semibold text-brand-navy">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((sub, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: stable by index
                <TableRow key={i} data-ocid={`admin.submissions.row.${i + 1}`}>
                  <TableCell className="font-medium">{sub.name}</TableCell>
                  <TableCell className="text-sm">{sub.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {sub.phone ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {sub.message}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(sub.timestamp)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────────────────

export default function AdminPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsCallerAdmin();

  const isLoggingIn = loginStatus === "logging-in";

  // Not logged in
  if (!identity) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="w-full max-w-sm border-0 shadow-navy"
            data-ocid="admin.login.panel"
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center mb-4">
                <Lock size={28} className="text-white" />
              </div>
              <CardTitle className="font-display text-2xl text-brand-navy">
                Admin Access
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Sign in with Internet Identity to access the admin panel
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <Button
                className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold gap-2 h-12"
                onClick={() => login()}
                disabled={isLoggingIn}
                data-ocid="admin.login.primary_button"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Connecting...
                  </>
                ) : (
                  <>
                    <Shield size={16} /> Sign In
                  </>
                )}
              </Button>
              <div className="mt-4 text-center">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-brand-navy transition-colors"
                  data-ocid="admin.login.back.link"
                >
                  ← Back to Website
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Checking admin status
  if (checkingAdmin) {
    return (
      <div
        className="min-h-screen bg-brand-light flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="text-center">
          <Loader2
            size={32}
            className="animate-spin text-brand-navy mx-auto mb-3"
          />
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
        <Card
          className="w-full max-w-sm border-0 shadow-card text-center"
          data-ocid="admin.unauthorized.panel"
        >
          <CardHeader>
            <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-4">
              <Shield size={28} className="text-brand-red" />
            </div>
            <CardTitle className="font-display text-xl text-brand-navy">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              Your account does not have administrator privileges.
            </p>
            <Link to="/">
              <Button
                className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-display font-semibold gap-2"
                data-ocid="admin.unauthorized.back.button"
              >
                <ArrowLeft size={16} /> Back to Website
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-brand-light">
      {/* Admin Header */}
      <div className="bg-brand-navy text-white py-4 px-4 sm:px-6 sticky top-0 z-40 shadow-navy">
        <div className="container max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/image-1.png"
              alt="Logo"
              className="h-8 w-8 object-contain rounded"
            />
            <div>
              <p className="font-display font-bold text-sm">Admin Portal</p>
              <p className="text-white/60 text-xs">EL-Shaddai Technologies</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-300 border-0 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1" />
              Administrator
            </Badge>
            <Link to="/" data-ocid="admin.nav.back.link">
              <Button
                size="sm"
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 gap-1 font-display"
              >
                <ArrowLeft size={14} /> Site
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Tabs defaultValue="content" data-ocid="admin.tabs.panel">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-card rounded-xl p-1 h-auto mb-8">
              <TabsTrigger
                value="content"
                className="gap-2 rounded-lg data-[state=active]:bg-brand-navy data-[state=active]:text-white font-display font-medium py-2.5"
                data-ocid="admin.content.tab"
              >
                <Settings size={14} />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger
                value="jobs"
                className="gap-2 rounded-lg data-[state=active]:bg-brand-navy data-[state=active]:text-white font-display font-medium py-2.5"
                data-ocid="admin.jobs.tab"
              >
                <Briefcase size={14} />
                <span className="hidden sm:inline">Jobs</span>
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="gap-2 rounded-lg data-[state=active]:bg-brand-navy data-[state=active]:text-white font-display font-medium py-2.5"
                data-ocid="admin.products.tab"
              >
                <Package size={14} />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger
                value="submissions"
                className="gap-2 rounded-lg data-[state=active]:bg-brand-navy data-[state=active]:text-white font-display font-medium py-2.5"
                data-ocid="admin.submissions.tab"
              >
                <Mail size={14} />
                <span className="hidden sm:inline">Submissions</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <Card className="border-0 shadow-card">
                <CardContent className="p-6 lg:p-8">
                  <ContentTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <Card className="border-0 shadow-card">
                <CardContent className="p-6 lg:p-8">
                  <JobsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card className="border-0 shadow-card">
                <CardContent className="p-6 lg:p-8">
                  <ProductsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions">
              <Card className="border-0 shadow-card">
                <CardContent className="p-6 lg:p-8">
                  <SubmissionsTab />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
