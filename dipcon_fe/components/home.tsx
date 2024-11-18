/*home.tsxx*/
"use client"

import React, { useState } from 'react'
import { Bell, User, LogOut, FileSignature, ChevronRight, ChevronDown, Home, FileText, BarChart2, HelpCircle, Settings, Users, Calendar, Clock, TrendingUp, AlertCircle, Search, Mail, MessageSquare, Plus, X, ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Signer {
  name: string;
  email: string;
}

interface ContractConditions {
  title: string;
  gameTitle: string;
  streamerId: string;
  gameId: string;
  minBroadcastTime: string;
  maxBroadcastTime: string;
  isMonetized: boolean;
  forbiddenWords: string;
  allowSpoilers: boolean;
  allowContentMonetization: boolean;
  allowSoundtrackUse: boolean;
  allowViolentContent: boolean;
}

interface Contract {
  id: string;
  title: string;
  signers: Signer[];
  date: string;
  conditions: ContractConditions;
}

export function HomeComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [signers, setSigners] = useState<Signer[]>([{ name: '', email: '' }])
  const [contractConditions, setContractConditions] = useState<ContractConditions>({
    title: '',
    gameTitle: '',
    streamerId: '',
    gameId: '',
    minBroadcastTime: '',
    maxBroadcastTime: '',
    isMonetized: false,
    forbiddenWords: '',
    allowSpoilers: false,
    allowContentMonetization: false,
    allowSoundtrackUse: false,
    allowViolentContent: false,
  })
  const [emailReminder, setEmailReminder] = useState(false)
  const [smsReminder, setSmsReminder] = useState(false)
  const [contracts, setContracts] = useState<Contract[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [activeTab, setActiveTab] = useState('home')

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => 
      prev.includes(menu) ? prev.filter(item => item !== menu) : [...prev, menu]
    )
  }

  const handleAddSigner = () => {
    setSigners([...signers, { name: '', email: '' }])
  }

  const handleRemoveSigner = (index: number) => {
    setSigners(signers.filter((_, i) => i !== index))
  }

  const updateSigner = (index: number, field: keyof Signer, value: string) => {
    const newSigners = [...signers]
    newSigners[index] = { ...newSigners[index], [field]: value }
    setSigners(newSigners)
  }

  const handleContractConditionsChange = (field: keyof ContractConditions, value: string | boolean) => {
    setContractConditions(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const newContract: Contract = {
      id: `C${String(contracts.length + 1).padStart(4, '0')}`,
      title: contractConditions.title,
      signers: signers,
      date: new Date().toISOString().split('T')[0],
      conditions: contractConditions,
    }
    setContracts([...contracts, newContract])
    setIsModalOpen(false)
    // Reset form state
    setCurrentStep(1)
    setSigners([{ name: '', email: '' }])
    setContractConditions({
      title: '',
      gameTitle: '',
      streamerId: '',
      gameId: '',
      minBroadcastTime: '',
      maxBroadcastTime: '',
      isMonetized: false,
      forbiddenWords: '',
      allowSpoilers: false,
      allowContentMonetization: false,
      allowSoundtrackUse: false,
      allowViolentContent: false,
    })
    setEmailReminder(false)
    setSmsReminder(false)
  }

  const sortedContracts = [...contracts].sort((a, b) => {
    return sortOrder === 'asc' 
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  const sidebarItems = [
    { title: '홈', icon: Home, href: '#', key: 'home' },
    { 
      title: '계약', 
      icon: FileText, 
      subItems: [
        { title: '계약 생성', href: '#', key: 'create-contract' },
        { title: '계약 목록', href: '#', key: 'contract-list' },
        { title: '서명 대기', href: '#', key: 'pending-signatures' },
      ]
    },
    { 
      title: '대시보드', 
      icon: BarChart2, 
      subItems: [
        { title: '계약 통계', href: '#', key: 'contract-stats' },
        { title: '수익 분석', href: '#', key: 'revenue-analysis' },
      ]
    },
    { title: '고객지원', icon: HelpCircle, href: '#', key: 'support' },
    { title: '설정', icon: Settings, href: '#', key: 'settings' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md hidden md:flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-orange-500">DIPCON</h1>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="mb-8 bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
        >
          <FileSignature className="h-5 w-5" />
          계약 시작
        </Button>
        <nav className="flex-1">
          {sidebarItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.subItems ? (
                <Collapsible open={openMenus.includes(item.title)} onOpenChange={() => toggleMenu(item.title)}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2 text-orange-500" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus.includes(item.title) ? 'transform rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2 mt-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <a 
                        key={subIndex} 
                        href={subItem.href} 
                        className="block p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setActiveTab(subItem.key)}
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <a 
                  href={item.href} 
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setActiveTab(item.key)}
                >
                  <item.icon className="h-5 w-5 mr-2 text-orange-500" />
                  <span>{item.title}</span>
                </a>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="검색..." 
                  className="pl-9 w-64"
                />
              </div>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><Button variant="ghost" className="text-gray-600 hover:text-orange-500">공지사항</Button></li>
                <li><Button variant="ghost" className="text-gray-600 hover:text-orange-500">FAQ</Button></li>
                <li><Button variant="ghost" className="text-gray-600 hover:text-orange-500">문의하기</Button></li>
                <li><Button variant="ghost" className="text-gray-600 hover:text-orange-500">이용가이드</Button></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto p-4 space-y-6">
          {activeTab === 'home' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">총 계약 건수</CardTitle>
                    <FileText className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{contracts.length}</div>
                    <p className="text-xs text-gray-500">전월 대비 +15%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">활성 계약</CardTitle>
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,832</div>
                    <p className="text-xs text-gray-500">전월 대비 +8%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">신규 계약</CardTitle>
                    <Users className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">284</div>
                    <p className="text-xs text-gray-500">이번 달 신규 계약</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">만료 예정</CardTitle>
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-gray-500">30일 이내 만료</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>최근 계약 현황</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contracts.slice(0, 5).map((contract, index) => (
                        <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div>
                            <p className="font-medium">{contract.title}</p>
                            <p className="text-sm text-gray-500">{contract.signers.map(s => s.name).join(', ')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{contract.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>계약 유형별 통계</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: "스트리밍 계약", count: 1245, percentage: 45 },
                        { type: "홍보 계약", count: 856, percentage: 31 },
                        { type: "스폰서십", count: 421, percentage: 15 },
                        { type: "마케팅", count: 156, percentage: 6 },
                        { type: "기타", count: 83, percentage: 3 },
                      ].map((stat, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{stat.type}</span>
                            <span className="text-sm text-gray-500">{stat.count}건</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${stat.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>예정된 계약</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "게임 F 계약 미팅", time: "14:00", type: "미팅" },
                        { title: "게임 G 계약서 검토", time: "15:30", type: "검토" },
                        { title: "게임 H 계약 체결", time: "16:45", type: "체결" },
                      ].map((event, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex-shrink-0">
                            <Clock className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.time}</p>
                          </div>
                          <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{event.type}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>최근 활동</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: "계약서 검토 완료", user: "김민수", time: "10분 전" },
                        { action: "새로운 계약 생성", user: "이지은", time: "32분 전" },
                        { action: "계약서 서명 완료", user: "박준호", time: "1시간 전" },
                        { action: "미팅 일정 확정", user: "최영희", time: "2시간 전" },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.user}</p>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>알림</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { message: "새로운 계약서 검토 요청", type: "warning", time: "방금 전" },
                        { message: "계약 만료 3일 전", type: "alert", time: "1시간 전" },
                        { message: "미팅 일정 변경", type: "info", time: "2시간 전" },
                        { message: "새로운 메시지 도착", type: "message", time: "3시간 전" },
                      ].map((notification, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex-1">
                            <p className="font-medium">{notification.message}</p>
                            <p className="text-sm text-gray-500">{notification.time}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            notification.type === "warning" ? "bg-yellow-500" :
                            notification.type === "alert" ? "bg-red-500" :
                            notification.type === "info" ? "bg-blue-500" :
                            "bg-green-500"
                          }`} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'contract-list' && (
            <Card>
              <CardHeader>
                <CardTitle>계약 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>계약 번호</TableHead>
                      <TableHead>계약 제목</TableHead>
                      <TableHead>서명자</TableHead>
                      <TableHead className="cursor-pointer" onClick={toggleSortOrder}>
                        계약 날짜
                        <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedContracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell>{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>{contract.signers.map(s => s.name).join(', ')}</TableCell>
                        <TableCell>{contract.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </main>

        <footer className="bg-white text-gray-600 mt-12 py-8 border-t">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 DIPCON. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-orange-500">계약 생성</DialogTitle>
            <DialogDescription>
              <div className="flex justify-between items-center mt-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className={`flex items-center ${currentStep >= step ? 'text-orange-500' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2 ${currentStep >= step ? 'border-orange-500' : 'border-gray-400'}`}>
                      {step}
                    </div>
                    <span>{step === 1 ? '서명자 정보' : step === 2 ? '계약 조건' : '계약 검토'}</span>
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="contract-title">계약 제목</Label>
                <Input
                  id="contract-title"
                  value={contractConditions.title}
                  onChange={(e) => handleContractConditionsChange('title', e.target.value)}
                  placeholder="계약 제목을 입력하세요"
                />
              </div>
              {signers.map((signer, index) => (
                <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">서명자 {index + 1}</Label>
                    {index > 0 && (
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveSigner(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`name-${index}`}>이름</Label>
                      <Input
                        id={`name-${index}`}
                        value={signer.name}
                        onChange={(e) => updateSigner(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`email-${index}`}>이메일</Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        value={signer.email}
                        onChange={(e) => updateSigner(index, 'email', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={handleAddSigner} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> 새 서명자 추가
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gameTitle">게임 제목</Label>
                  <Input
                    id="gameTitle"
                    value={contractConditions.gameTitle}
                    onChange={(e) => handleContractConditionsChange('gameTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="streamerId">스트리머 ID</Label>
                  <Input
                    id="streamerId"
                    value={contractConditions.streamerId}
                    onChange={(e) => handleContractConditionsChange('streamerId', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gameId">게임 ID</Label>
                  <Input
                    id="gameId"
                    value={contractConditions.gameId}
                    onChange={(e) => handleContractConditionsChange('gameId', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="minBroadcastTime">최소 방송시간</Label>
                  <Input
                    id="minBroadcastTime"
                    value={contractConditions.minBroadcastTime}
                    onChange={(e) => handleContractConditionsChange('minBroadcastTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxBroadcastTime">최대 방송시간</Label>
                  <Input
                    id="maxBroadcastTime"
                    value={contractConditions.maxBroadcastTime}
                    onChange={(e) => handleContractConditionsChange('maxBroadcastTime', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>수익화 여부</Label>
                <RadioGroup
                  value={contractConditions.isMonetized ? 'yes' : 'no'}
                  onValueChange={(value) => handleContractConditionsChange('isMonetized', value === 'yes')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="monetized-yes" />
                    <Label htmlFor="monetized-yes">예</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="monetized-no" />
                    <Label htmlFor="monetized-no">아니오</Label>
                  </div>
                </RadioGroup>
              </div>
              {contractConditions.isMonetized && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="forbiddenWords">금지어</Label>
                    <Textarea
                      id="forbiddenWords"
                      value={contractConditions.forbiddenWords}
                      onChange={(e) => handleContractConditionsChange('forbiddenWords', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>추가 조건</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowSpoilers"
                          checked={contractConditions.allowSpoilers}
                          onCheckedChange={(checked) => handleContractConditionsChange('allowSpoilers', checked as boolean)}
                        />
                        <Label htmlFor="allowSpoilers">스포일러 허용</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowContentMonetization"
                          checked={contractConditions.allowContentMonetization}
                          onCheckedChange={(checked) => handleContractConditionsChange('allowContentMonetization', checked as boolean)}
                        />
                        <Label htmlFor="allowContentMonetization">저작물 수익화 허용</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowSoundtrackUse"
                          checked={contractConditions.allowSoundtrackUse}
                          onCheckedChange={(checked) => handleContractConditionsChange('allowSoundtrackUse', checked as boolean)}
                        />
                        <Label htmlFor="allowSoundtrackUse">사운드트랙 사용 허용</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowViolentContent"
                          checked={contractConditions.allowViolentContent}
                          onCheckedChange={(checked) => handleContractConditionsChange('allowViolentContent', checked as boolean)}
                        />
                        <Label htmlFor="allowViolentContent">폭력 및 선정성 컨텐츠 허용</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">계약 내용 요약</h3>
                <div className="space-y-2">
                  <p><strong>계약 제목:</strong> {contractConditions.title}</p>
                  <p><strong>게임 제목:</strong> {contractConditions.gameTitle}</p>
                  <p><strong>스트리머 ID:</strong> {contractConditions.streamerId}</p>
                  <p><strong>게임 ID:</strong> {contractConditions.gameId}</p>
                  <p><strong>방송 시간:</strong> {contractConditions.minBroadcastTime} - {contractConditions.maxBroadcastTime}</p>
                  <p><strong>수익화 여부:</strong> {contractConditions.isMonetized ? '예' : '아니오'}</p>
                  {contractConditions.isMonetized && (
                    <>
                      <p><strong>금지어:</strong> {contractConditions.forbiddenWords}</p>
                      <p><strong>스포일러 허용:</strong> {contractConditions.allowSpoilers ? '예' : '아니오'}</p>
                      <p><strong>저작물 수익화 허용:</strong> {contractConditions.allowContentMonetization ? '예' : '아니오'}</p>
                      <p><strong>사운드트랙 사용 허용:</strong> {contractConditions.allowSoundtrackUse ? '예' : '아니오'}</p>
                      <p><strong>폭력 및 선정성 컨텐츠 허용:</strong> {contractConditions.allowViolentContent ? '예' : '아니오'}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>계약 리마인더</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailReminder"
                    checked={emailReminder}
                    onCheckedChange={(checked) => setEmailReminder(checked as boolean)}
                  />
                  <Label htmlFor="emailReminder">이메일 알림</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smsReminder"
                    checked={smsReminder}
                    onCheckedChange={(checked) => setSmsReminder(checked as boolean)}
                  />
                  <Label htmlFor="smsReminder">SMS 알림</Label>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">서명자 정보</h3>
                <ul className="list-disc list-inside">
                  {signers.map((signer, index) => (
                    <li key={index}>{signer.name} ({signer.email})</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              이전
            </Button>
            <Button
              onClick={() => {
                if (currentStep < 3) {
                  setCurrentStep(prev => prev + 1)
                } else {
                  handleSubmit()
                }
              }}
            >
              {currentStep < 3 ? '다음' : '완료'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
 }
 export default Home;
