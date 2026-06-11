// ============================================
// Sandbox0 UI - Retro console design system
// ============================================

// Primitive Components
export { PixelBox } from "./components/PixelBox";
export { PixelButton } from "./components/PixelButton";
export { PixelCard } from "./components/PixelCard";
export { PixelCollapsible, PixelCollapsiblePanel } from "./components/PixelCollapsible";
export { PixelDialog } from "./components/PixelDialog";
export { PixelDropdown, PixelDropdownChevron } from "./components/PixelDropdown";
export { PixelIconClose } from "./components/PixelIconClose";
export { PixelCheckbox } from "./components/PixelCheckbox";
export type { PixelCheckboxProps } from "./components/PixelCheckbox";
export { PixelInput } from "./components/PixelInput";
export { PixelTextarea } from "./components/PixelTextarea";
export type { PixelTextareaProps } from "./components/PixelTextarea";
export { PixelSelect } from "./components/PixelSelect";
export type { PixelSelectOption, PixelSelectProps } from "./components/PixelSelect";
export { PixelBadge } from "./components/PixelBadge";
export type { PixelBadgeProps } from "./components/PixelBadge";
export { PixelCallout } from "./components/PixelCallout";
export { PixelHeading } from "./components/PixelHeading";

// Console / dashboard primitives
export { Panel } from "./components/Panel";
export type { PanelProps } from "./components/Panel";
export { PageHeader } from "./components/PageHeader";
export type { PageHeaderProps, BreadcrumbItem } from "./components/PageHeader";
export { StatCard, StatGrid } from "./components/Stat";
export type { StatCardProps, StatGridProps } from "./components/Stat";
export { DataList } from "./components/DataList";
export type { DataListProps, DataListItem } from "./components/DataList";
export { DangerZone, FieldGrid, FormSection } from "./components/Form";
export type { DangerZoneProps, FieldGridProps, FormSectionProps } from "./components/Form";
export { StatusPill, statusTone } from "./components/StatusPill";
export type { StatusPillProps, StatusTone } from "./components/StatusPill";
export {
  KeyValueEditor,
  pairsToRecord,
  recordToPairs,
} from "./components/KeyValueEditor";
export type { KeyValueEditorProps, KeyValuePair } from "./components/KeyValueEditor";
export { CodeBlock } from "./components/CodeBlock";
export type { CodeBlockProps } from "./components/CodeBlock";
export { SegmentedControl } from "./components/SegmentedControl";
export type { SegmentedControlProps, SegmentedOption } from "./components/SegmentedControl";
export { Toolbar, SearchInput } from "./components/Toolbar";
export type { ToolbarProps, SearchInputProps } from "./components/Toolbar";
export { DataTable } from "./components/Table";
export type { DataTableProps, DataTableColumn } from "./components/Table";
export { EmptyState, Notice } from "./components/Feedback";
export type { EmptyStateProps, NoticeProps, NoticeTone } from "./components/Feedback";
export { Skeleton } from "./components/Skeleton";
export type { SkeletonProps } from "./components/Skeleton";

// Layout Components
export { PixelLayout } from "./components/PixelLayout";

// Types
export type { PixelScale } from "./types";
export type { PixelHeadingAs, PixelHeadingTone, PixelHeadingProps } from "./components/PixelHeading";
export type {
  PixelCollapsibleProps,
  PixelCollapsiblePanelProps,
} from "./components/PixelCollapsible";
export type { PixelDialogProps } from "./components/PixelDialog";
export type {
  PixelDropdownProps,
  PixelDropdownRenderContext,
} from "./components/PixelDropdown";
export type { PixelIconCloseProps } from "./components/PixelIconClose";

// Utilities
export { cn, getPixelShadowClass, getPixelFontClass } from "./utils";
