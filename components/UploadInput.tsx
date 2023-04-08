import classNames from "classnames"
import ProgressBar from "./ProgressBar"
import { useState, useRef } from "react"
import TelegramApi from "../endpoints/telegram"
import { useTranslation } from "next-i18next"
import { addDocument, deleteDocumentById } from "../endpoints/documents"

import CrossIcon from "../assets/icons/cross.svg"
import UploadIcon from "../assets/icons/upload.svg"

import type { ChangeEvent, FC, MouseEvent } from "react"
import type { AxiosProgressEvent } from "axios"

type UploadInputProps = {
  id: string
  label: string
  isErrored?: boolean
  helperText?: string | null
  documentId: string | undefined
  setDocumentId: (fileId?: string) => void
}

const UploadInput: FC<UploadInputProps> = ({
  setDocumentId,
  documentId,
  helperText,
  isErrored,
  label,
  id,
}) => {
  const { t } = useTranslation("common")

  const messageId = useRef<number>()
  const hasDocument = useRef<boolean>(false)
  const documentInput = useRef<HTMLInputElement>(null)
  const deleteDocumentButton = useRef<HTMLButtonElement>(null)

  const [progress, setProgress] = useState<number>(0)

  const onUploadProgress = (event: AxiosProgressEvent) => {
    const percentCompleted = Math.round((event.loaded * 100) / Number(event.total))
    setProgress(percentCompleted)
  }
  
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) {
      return deleteDocumentButton.current?.click()
    }
    
    const file = event.target.files[0]
    try {
      const document = await TelegramApi.sendDocument(file, { onUploadProgress })
      const { file_name, file_size, file_id, message_id, mime_type } = document
      await addDocument({
        message_id,
        mime_type,
        file_name,
        file_size,
        file_id,
      })
      setDocumentId(document.file_id)
      messageId.current = document.message_id
      hasDocument.current = true
    } catch (error) {
      console.error(error)
      setDocumentId(undefined)
      hasDocument.current = false
    } finally {
      setProgress(0)
    }
  }
  
  const handleDeleteDocument = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (messageId.current === undefined || documentId === undefined) return

    try {
      await TelegramApi.deleteMessage(messageId.current)
      await deleteDocumentById(documentId)
      hasDocument.current = false
      setDocumentId(undefined)
      if (documentInput.current) {
        documentInput.current.value = ""
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="upload-document">
      <label htmlFor={id} className="upload-document__label">{label}</label>
      <label
        htmlFor={id}
        aria-invalid={isErrored}
        className={classNames(
          "upload-document__container",
          {"upload-document__container--has-document": progress > 0 || hasDocument.current},
        )}
      >
        <input
          id={id}
          type="file"
          ref={documentInput}
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="upload-document__input"
        />
        <div className="upload-document__content">
          <p className="upload-document__title">
            {progress === 0 && !hasDocument.current && t("upload_input_initial_title")}
            {progress > 0 && t("upload_input_uploading_title")}
            {progress === 0 && hasDocument.current && documentId}
          </p>
          <div className="upload-document__buttons">
            <button
              type="button"
              ref={deleteDocumentButton}
              className={classNames(
                "button",
                "upload-document__button",
                {"upload-document__button--invisible": !hasDocument.current},
              )}
              onClick={handleDeleteDocument}
            ><CrossIcon /></button>
            <button
              type="button"
              className={classNames(
                "button",
                "upload-document__button",
                {"upload-document__button--invisible": hasDocument.current},
              )}
            ><UploadIcon /></button>
          </div>
        </div>
        <div
          className={classNames(
            "upload-document__progress",
            {"upload-document__progress--visible": progress > 0},
          )}
        >
          <ProgressBar progress={progress} />
        </div>
      </label>
      <p
        aria-invalid={isErrored}
        className={classNames(
          "upload-document__helper",
          { "upload-document__helper--visible": helperText }
        )}
      >
        {helperText} &nbsp;
      </p>
    </div>
  )
}


export default UploadInput