// composables/useDownload.ts
import { useFetch } from '@vueuse/core'

export const useDownload = () => {
  const downloadFile = async (fileUrl: string, fileName: string) => {
    // On récupère le blob
    const { data, onFetchResponse } = useFetch(fileUrl).blob()

    onFetchResponse(async (response) => {
      const blob = await response.blob()
      
      // Méthode Classique (Apparaît dans les téléchargements)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      
      // Astuce pour Firefox : ajouter au DOM
      document.body.appendChild(a)
      a.click()
      
      // Nettoyage
      document.body.removeChild(a)
      
      // Petit délai pour être sûr que le téléchargement démarre avant de révoquer l'URL
      setTimeout(() => URL.revokeObjectURL(url), 100)
    })
  }

  return {
    downloadFile
  }
}
