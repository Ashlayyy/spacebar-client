import * as Icons from "@mdi/js";
import { APIAttachment, EmbedType } from "@spacebarchat/spacebar-api-types/v9";
import { ARCHIVE_MIMES, EMBEDDABLE_AUDIO_MIMES, EMBEDDABLE_IMAGE_MIMES, EMBEDDABLE_VIDEO_MIMES } from "./constants";

export const decimalColorToHex = (decimal: number) => {
	return `#${decimal.toString(16)}`;
};

// function to convert bytes to human readable format
export const bytesToSize = (bytes: number) => {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	if (bytes === 0) return "0 Byte";
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

export const isImage = (fileOrAttachment: File | APIAttachment) => {
	const contentType = "type" in fileOrAttachment ? fileOrAttachment.type : fileOrAttachment.content_type;
	return (
		contentType?.startsWith("image/") ||
		("content_type" in fileOrAttachment && fileOrAttachment.content_type === EmbedType.Image)
	);
};

export const isVideo = (fileOrAttachment: File | APIAttachment) => {
	const contentType = "type" in fileOrAttachment ? fileOrAttachment.type : fileOrAttachment.content_type;
	return (
		contentType?.startsWith("video/") ||
		("content_type" in fileOrAttachment && fileOrAttachment.content_type === EmbedType.Video)
	);
};

export const isAudio = (fileOrAttachment: File | APIAttachment) => {
	const contentType = "type" in fileOrAttachment ? fileOrAttachment.type : fileOrAttachment.content_type;
	return contentType?.startsWith("audio/");
};

export const isArchive = (fileOrAttachment: File | APIAttachment) => {
	const name = "name" in fileOrAttachment ? fileOrAttachment.name : fileOrAttachment.filename;
	return ARCHIVE_MIMES.includes(name.split(".").pop() || "");
};

type IconsType = keyof typeof Icons;
// returns the icon for a file based on its mimetype
export const getFileIcon = (fileOrAttachment: File | APIAttachment): IconsType => {
	if (isImage(fileOrAttachment)) return "mdiFileImage";
	if (isVideo(fileOrAttachment)) return "mdiFileVideo";
	if (isAudio(fileOrAttachment)) return "mdiFileMusic";
	if (isArchive(fileOrAttachment)) return "mdiFolderZip";
	return "mdiFile";
};

export const isFileEmbeddable = (fileOrAttachment: File | APIAttachment) => {
	const contentType = "type" in fileOrAttachment ? fileOrAttachment.type : fileOrAttachment.content_type;

	const image =
		contentType === EmbedType.Image ||
		EMBEDDABLE_IMAGE_MIMES.includes(contentType?.toLowerCase().split("/").pop() || "");
	const video =
		contentType === EmbedType.Video ||
		EMBEDDABLE_VIDEO_MIMES.includes(contentType?.toLowerCase().split("/").pop() || "");
	const audio = EMBEDDABLE_AUDIO_MIMES.includes(contentType?.toLowerCase().split("/").pop() || "");
	return (
		(isImage(fileOrAttachment) && image) ||
		(isVideo(fileOrAttachment) && video) ||
		(isAudio(fileOrAttachment) && audio)
	);
};

export const getFileDetails = (fileOrAttachment: File | APIAttachment) => {
	return {
		icon: getFileIcon(fileOrAttachment),
		isEmbeddable: isFileEmbeddable(fileOrAttachment),
		isVideo: isVideo(fileOrAttachment),
		isImage: isImage(fileOrAttachment),
		isAudio: isAudio(fileOrAttachment),
		isArchive: isArchive(fileOrAttachment),
	};
};

// @ts-expect-error - tauri is not defined
export const isTauri = !!window.__TAURI__;
