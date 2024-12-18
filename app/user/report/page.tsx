'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'react-toastify'

export default function UserReport() {
  const [lastSeen, setLastSeen] = useState('')
  const [reporterName, setReporterName] = useState('')
  const [reporterContact, setReporterContact] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [reportType, setReportType] = useState('person') // Default to 'person'
  const [itemName, setItemName] = useState('')
  const [photo, setPhoto] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const reportData = {
      itemName,
      reportType,
      name,
      description,
      lastSeen,
      reportedBy: reporterName,
      photo,
    }

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Report submitted:', data)
        toast("Report Submitted: Your report has been successfully submitted.")
        // Reset form
        setName('')
        setDescription('')
        setLastSeen('')
        setReporterName('')
        setReporterContact('')
        setItemName('')
        setPhoto('')
        setReportType('person') // Reset to default
      } else {
        const errorData = await response.json()
        toast(`Error: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error submitting report:', error)
      toast('Error submitting report')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-200">
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Report Missing</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="mb-4">
            <Label>Report Type</Label>
            <RadioGroup defaultValue="person" onValueChange={setReportType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="person" id="person" />
                <Label htmlFor="person">Person</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="item" id="item" />
                <Label htmlFor="item">Item</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mb-4">
            <Label htmlFor="name">{reportType === 'person' ? 'Name' : 'Item Name'}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="lastSeen">Last Seen Location</Label>
            <Input
              id="lastSeen"
              value={lastSeen}
              onChange={(e) => setLastSeen(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="reporterName">Reporter Name</Label>
            <Input
              id="reporterName"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="reporterContact">Image</Label>
            <Input
              type='file'
              id="reporterContact"
              value={reporterContact}
              onChange={(e) => setReporterContact(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Submit Report</Button>
        </form>
      </main>
    </div>
  )
}