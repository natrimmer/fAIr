import { Image } from "@/components/ui/image";
import ToolTip from "@/components/ui/tooltip/tooltip";
import {
  useTrainingDetails,
  useTrainingStatus,
} from "@/features/models/hooks/use-training";
import { useEffect, useMemo, useState } from "react";
import AccuracyDisplay from "./accuracy-display";
import { Link } from "@/components/ui/link";
import { CopyIcon, ExternalLinkIcon } from "@/components/ui/icons";
import { ModelPropertiesSkeleton } from "./skeletons";
import CodeBlock from "@/components/ui/codeblock/codeblock";
import ChevronDownIcon from "@/components/ui/icons/chevron-down-icon";
import { APP_CONTENT, cn } from "@/utils";
import { ENVS } from "@/config/env";
import useCopyToClipboard from "@/hooks/use-clipboard";
import { useToastNotification } from "@/hooks/use-toast-notification";

enum TrainingStatus {
  FAILED = "FAILED",
  IN_PROGRESS = "IN PROGRESS",
}

type PropertyDisplayProps = {
  label: string;
  value?: string | number | null;
  tooltip?: string;
  isAccuracy?: boolean;
  isLink?: boolean;
  animate?: boolean;
  href?: string;
  isCopy?: boolean;
};

const PropertyDisplay: React.FC<PropertyDisplayProps> = ({
  label,
  value,
  tooltip,
  isAccuracy,
  isLink,
  animate,
  href,
  isCopy,
}) => {
  const { copyToClipboard } = useCopyToClipboard();
  return (
    <div className="row-span-1 col-span-1 flex flex-col gap-y-5">
      <span className="text-gray text-body-2 flex items-center gap-x-4 text-nowrap ">
        {label}
        {tooltip && <ToolTip content={tooltip} />}
      </span>
      {isAccuracy ? (
        <AccuracyDisplay accuracy={typeof value === "number" ? value : 0} />
      ) : isLink ? (
        <Link
          href={href as string}
          blank
          nativeAnchor
          className="flex items-center gap-x-3"
          title={label}
        >
          <span className="text-dark font-semibold text-title-3">{value}</span>
          <ExternalLinkIcon className="icon" />
        </Link>
      ) : isCopy ? (
        <div className="flex items-center gap-x-3">
          <span className="text-dark font-semibold text-title-3">URL</span>
          <button onClick={() => copyToClipboard(value as string)}>
            <CopyIcon className="icon md:icon-lg" />
          </button>
        </div>
      ) : (
        <span
          className={cn(
            `${animate && "animate-pulse"} text-dark font-semibold text-title-3`,
          )}
        >
          {value ?? "N/A"}
        </span>
      )}
    </div>
  );
};
type ModelPropertiesProps = {
  trainingId: number;
  accuracy?: number;
  datasetId?: number;
  isTrainingDetailsDialog?: boolean;
  baseModel: string;
};

const ModelProperties: React.FC<ModelPropertiesProps> = ({
  trainingId,
  datasetId,
  isTrainingDetailsDialog = false,
  baseModel,
}) => {
  const { isPending, data, error, isError } = useTrainingDetails(trainingId);

  const toast = useToastNotification();

  useEffect(() => {
    //@ts-expect-error bad type definition
    if (isError && error?.response?.data?.detail) {
      //@ts-expect-error bad type definition
      toast(error.response.data.detail, "danger");
    }
  }, [isError, error, toast]);

  const {
    accuracy: trainingAccuracy,

    zoom_level,
    epochs,
    batch_size,
    input_contact_spacing,
    input_boundary_width,
    source_imagery,
    chips_length,
  } = data || {};

  const trainingResultsGraph = `${ENVS.BASE_API_URL}workspace/download/dataset_${datasetId}/output/training_${data?.id}/graphs/training_validation_sparse_categorical_accuracy.png`;

  const content = useMemo(() => {
    if (isPending) {
      return <ModelPropertiesSkeleton isTrainingDetailsDialog />;
    }

    return (
      <div
        className={cn(
          `grid ${isTrainingDetailsDialog ? "grid-cols-2" : "grid-cols-1 lg:grid-cols-5"} gap-14 items-center `,
        )}
      >
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 grid-rows-4 gap-y-4 md:gap-y-10">
          <PropertyDisplay
            label={
              APP_CONTENT.models.modelsDetailsCard.properties.zoomLevels.title
            }
            value={zoom_level?.join(" ") || "N/A"}
            tooltip={
              APP_CONTENT.models.modelsDetailsCard.properties.zoomLevels.tooltip
            }
          />
          <PropertyDisplay
            label={
              APP_CONTENT.models.modelsDetailsCard.properties.accuracy.title
            }
            tooltip={
              APP_CONTENT.models.modelsDetailsCard.properties.accuracy.tooltip
            }
            value={trainingAccuracy}
            isAccuracy
          />
          <PropertyDisplay
            label={APP_CONTENT.models.modelsDetailsCard.properties.epochs.title}
            value={epochs}
            tooltip={
              APP_CONTENT.models.modelsDetailsCard.properties.epochs.tooltip
            }
          />
          <PropertyDisplay
            label={
              APP_CONTENT.models.modelsDetailsCard.properties.batchSize.title
            }
            value={batch_size}
            tooltip={
              APP_CONTENT.models.modelsDetailsCard.properties.batchSize.tooltip
            }
          />
          <PropertyDisplay
            label={
              APP_CONTENT.models.modelsDetailsCard.properties.contactSpacing
                .title
            }
            value={input_contact_spacing}
            tooltip={
              APP_CONTENT.models.modelsDetailsCard.properties.contactSpacing
                .tooltip
            }
          />
          <PropertyDisplay
            label={
              APP_CONTENT.models.modelsDetailsCard.properties.boundaryWidth
                .title
            }
            value={input_boundary_width}
            tooltip={
              APP_CONTENT.models.modelsDetailsCard.properties.boundaryWidth
                .tooltip
            }
          />
          <PropertyDisplay
            label={
              APP_CONTENT.models.modelsDetailsCard.properties.currentDatasetSize
                .title
            }
            value={`${chips_length} Images`}
            tooltip={
              APP_CONTENT.models.modelsDetailsCard.properties.currentDatasetSize
                .tooltip
            }
          />
          {/* Animate the status when it's in progress. */}
          {isTrainingDetailsDialog && (
            <PropertyDisplay
              label={
                APP_CONTENT.models.modelsDetailsCard.trainingInfoDialog.status
              }
              value={data?.status}
              animate={data?.status === TrainingStatus.IN_PROGRESS}
            />
          )}
          <PropertyDisplay
            label={
              APP_CONTENT.models.modelsDetailsCard.properties.baseModel.title
            }
            value={baseModel}
            isLink
            href={
              // @ts-expect-error bad type definition
              APP_CONTENT.models.modelsDetailsCard.properties.baseModel.href[
                baseModel
              ]
            }
          />

          {/* Copy icon */}
          <PropertyDisplay
            label={
              APP_CONTENT.models.modelsDetailsCard.properties.sourceImage.title
            }
            tooltip={
              APP_CONTENT.models.modelsDetailsCard.properties.sourceImage
                .tooltip
            }
            value={source_imagery}
            isCopy
          />
        </div>

        <div
          className={`col-span-3 lg:col-span-2 ${isTrainingDetailsDialog && "lg:col-span-3"}`}
        >
          <Image src={trainingResultsGraph} alt={""} />
        </div>
        {/* Show logs only in modal and when status failed */}
        {isTrainingDetailsDialog && data?.status === TrainingStatus.FAILED && (
          //@ts-expect-error bad type definition
          <FailedTrainingTraceBack taskId={data?.task_id} />
        )}
      </div>
    );
  }, [
    isPending,
    trainingAccuracy,
    epochs,
    zoom_level,
    batch_size,
    input_contact_spacing,
    input_boundary_width,
    source_imagery,
    trainingResultsGraph,
  ]);

  return isError ? (
    <ModelPropertiesSkeleton isTrainingDetailsDialog />
  ) : (
    content
  );
};

export default ModelProperties;

const FailedTrainingTraceBack = ({ taskId }: { taskId: string }) => {
  const { data, isPending } = useTrainingStatus(taskId);
  const [showLogs, setShowLogs] = useState(false);

  if (isPending) {
    return (
      <div className="h-40 col-span-5 w-full animate-pulse bg-light-gray"></div>
    );
  }
  return (
    <div className="col-span-5 flex flex-col gap-y-4">
      <div
        onClick={() => setShowLogs(!showLogs)}
        role="button"
        className="flex items-center gap-x-2"
      >
        <p>{APP_CONTENT.models.modelsDetailsCard.trainingInfoDialog.logs}</p>
        <ChevronDownIcon className={`icon ${showLogs && "rotate-180"}`} />
      </div>
      {showLogs && <CodeBlock content={data?.traceback as string} />}
    </div>
  );
};
