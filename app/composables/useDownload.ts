// composables/useDownload.ts
import { useFetch } from '@vueuse/core'

export const useDownload = () => {
  const downloadFile = async (fileUrl: string, fileName: string) => {
    const { data, onFetchResponse } = useFetch(fileUrl).blob()

    onFetchResponse(async (response) => {
      const blob = await response.blob()

      // Option 1: Modern "Save As" (Chrome/Edge/Opera Desktop)
      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: fileName,
            types: [{ description: 'PDF File', accept: { 'application/pdf': ['.pdf'] } }],
          })
          const writable = await handle.createWritable()
          await writable.write(blob)
          await writable.close()
        } catch (e) { 
          // Annulé par l'utilisateur, on ne fait rien
        }
      } 
      // Option 2: Fallback classique (Firefox, Safari, Mobile)
      else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
        URL.revokeObjectURL(url)
      }
    })
  }

  return {
    downloadFile
  }
}