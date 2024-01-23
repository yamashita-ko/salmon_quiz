Add-Type -AssemblyName System.Windows.Forms

If ([Windows.Forms.Clipboard]::ContainsImage() -eq $True) {
  $Image = [Windows.Forms.Clipboard]::GetImage()
  $FilePath = "C:\pleiades\2022-12\salmon\salmon_quiz\src\main\resources\static\images"
  $FileName = (Get-Date -Format "yyyyMMddHHmmss") + ".png"
  $ImagePath = Join-Path $FilePath $FileName
  $Image.Save($ImagePath, [System.Drawing.Imaging.ImageFormat]::Png)
}