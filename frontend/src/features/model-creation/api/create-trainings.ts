import { API_ENDPOINTS, apiClient } from "@/services";
import {
  TTrainingAreaFeature,
  TTrainingDataset,
  TTrainingDetails,
} from "@/types";

export type TCreateTrainingDatasetArgs = {
  name: string;
  source_imagery: string;
  status?: number;
};

export const createTrainingDataset = async ({
  name,
  source_imagery,
  status = 0,
}: TCreateTrainingDatasetArgs): Promise<TTrainingDataset> => {
  return await (
    await apiClient.post(API_ENDPOINTS.CREATE_TRAINING_DATASETS, {
      name,
      source_imagery,
      status,
    })
  ).data;
};

export type TCreateTrainingAreaArgs = {
  dataset: string;
  geom: string;
};

export const createTrainingArea = async ({
  dataset,
  geom,
}: TCreateTrainingAreaArgs): Promise<TTrainingAreaFeature> => {
  return await (
    await apiClient.post(API_ENDPOINTS.CREATE_TRAINING_AREA, {
      dataset,
      geom,
    })
  ).data;
};

export type TCreateTrainingRequestArgs = {
  batch_size: number;
  epochs: number;
  input_boundary_width: number;
  input_contact_spacing: number;
  model: string;
  zoom_level: number[];
};

export const createTrainingRequest = async ({
  batch_size,
  epochs,
  input_boundary_width,
  input_contact_spacing,
  model,
  zoom_level,
}: TCreateTrainingRequestArgs): Promise<TTrainingDetails> => {
  return await (
    await apiClient.post(API_ENDPOINTS.CREATE_TRAINING_REQUEST, {
      batch_size,
      epochs,
      description: "",
      freeze_layer: false,
      input_contact_spacing,
      input_boundary_width,
      model,
      multimask: false,
      zoom_level,
    })
  ).data;
};

export type TCreateTrainingAreaLabelsArgs = {
  aoiId: number;
};

export const createTrainingAreaLabels = async ({
  aoiId,
}: TCreateTrainingAreaLabelsArgs): Promise<String> => {
  return await (
    await apiClient.post(API_ENDPOINTS.CREATE_TRAINING_AREA_LABELS(aoiId))
  ).data;
};
