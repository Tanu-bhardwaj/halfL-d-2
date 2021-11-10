Ext.application({
    name : 'Fiddle',
    launch : function() {
	
	var count = 0;
	
		var form = Ext.create('Ext.form.Panel',{
			id:'movieForm',
			renderTo:Ext.getBody(),
			border:true,
			title:'Movie Advance search',
			autoEl:'middle',			
			items:[
				
								{
					xtype:'textfield',
					fieldLabel:'Movie Name',
					margin:'40 0 0 200',
					id:'movieNameId',
					enableKeyEvents:true,
					
					
				},
				{
					xtype:'textfield',
					fieldLabel:'Director Name',
					margin:'-30 0 0 900',
					id:'Did',
						
					
					
				},
				{
					xtype:'textfield',
					fieldLabel:'Release Year',
					margin:'80 0 10 200',
					id:'RYid'
				
				},
				{
					xtype:'combobox',
					fieldLabel:'Language',
					margin:'-40 0 50 900',
					id:'Lid',
					store:{
						extend:'Ext.data.Store',
						
						fields:['Language','id'],
										data:[
											{
												'Language':'English',
												'id':1
										},
										{
												'Language':'Italian',
												'id':2
										},{
												'Language':'Japanese',
												'id':3
										},
										{
												'Language':'Mandarin',
												'id':4
										},
										{
												'Language':'French',
												'id':5
										},
										{
												'Language':'German',
												'id':6
										},
										{
												'Language':'Mongolian',
												'id':7
										}
						]
					},
					
					displayField:'Language',
					valueField:'id'
	
					
				}
					
				],
				
	
			});
	var validate = function(){
					if(Ext.getCmp('movieNameId').value != "" &&
						Ext.getCmp('RYid').value != "" &&
						Ext.getCmp('Did').value != "" &&
						Ext.getCmp('Lid').value != ""  )
						{
							Ext.getCmp('searchButton').disabled(false);
						}
						
			
			}		
		var buttonBox = Ext.create('Ext.Container',{
			
			
			width:"100%",
			border:'true',
			margin:'50 0 0 0',
			
			defaults:{
				xtype:'button',
				margin:5,
				
			},
			items:[
				{
					text:'Search',
					id:'searchButton',
					margin:'5 5 5 700',
					//disabled:true,
					handler:function()
					{ 
						
							if(Ext.getCmp('movieNameId').value != "" &&
						Ext.getCmp('RYid').value != "" &&
						Ext.getCmp('Did').value != "" &&
						Ext.getCmp('Lid').value != ""  )
						{
							movieStore.proxy.url='http://localhost:8080/Summer_Internship_Backend/searchFilm.action',
							movieGrid.store.load({
								
						params:{
							
							start:"0",
							limit:"5",
							//isFilter:"1",
							Title:Ext.getCmp('movieNameId').value,
							releaseYear:Ext.getCmp('RYid').value,
							Director:Ext.getCmp('Did').value,
							language:Ext.getCmp('Lid').value
						}
						});
						}
						else
						{
							Ext.Msg.alert("Please FIll all the Fields");
						}
						
					}
					
					
				},
				{
					text:'Reset',
					handler:function()
					{
						
						Ext.getCmp('searchButton').setDisabled(false);
						Ext.getCmp('movieNameId').setValue("");
						Ext.getCmp('RYid').setValue("");
						Ext.getCmp('Did').setValue("");
						Ext.getCmp('Lid').setValue("");
						movieGrid.store.load({
							params:
							{
								isFilter:"0",
								start:"0",
								limit:"10"
							}
						})
					}
				}
			],
			renderTo:Ext.getBody()
		});
		
		
						
						//Ext.getCmp('searchButton').setDisabled(true),
						Ext.define('movies', {
							     extend: 'Ext.data.Model',
							     fields: [
							         {name: 'Title', type: 'string'},
							         {name: 'description',  type: 'string'},
							         {name: 'releaseYear',       type: 'int'},
							         {name: 'language',  type: 'string'},
  									 {name: 'directorName',  type:'string'},
							         {name: 'rating',       type: 'string'},
							         {name: 'specialFeatures',  type: 'string'},
									{name:'filmId',type:'int'}
							     ],
								/*proxy:{
									type:'rest',
									url:'http://localhost:8080/Summer_Internship_Backend/fetchFilm.action',
									
								}*/
									
							 });
				
				var movieStore = Ext.create('Ext.data.Store',{
							storeId:'Movies',
							pageSize:10,
							autoLoad:false,
							model:'movies',
							
							proxy:{
								type:'ajax',
								//enablePaging:true,
								
								url:'http://localhost:8080/Summer_Internship_Backend/fetchFilm.action',
								
								reader: {
									type: 'json',
									rootProperty:'movieList.AllMovieData',
									//record:'AllMovieData',
									totalProperty:'movieList.total',
									
									
								        
								    }
							},
							
							
							
						})
					
					
					//Ext.Ajax.timeout = 60000;	
					
					movieStore.load({
							params:{
								start:"0",
								limit:"10",
								
								
							}
						});
				var movieGrid = Ext.create('Ext.grid.Panel',{
							
							title:'Movie Grid',
							store:Ext.data.StoreManager.lookup('Movies'),
							
							id:'detailsGrid',
							
							width:"100%",
							
							columns:[
								{
									text:'Title',
									dataIndex:'title',
									width:200
									
								},
								{
									text:'Description',
									dataIndex:'description',
									width:200
								},
								{
									text:'Release Year',
									dataIndex:'releaseYear',
									width:200
								},{
									text:'Language',
									dataIndex:'language',
									width:200
								},
								{
									text:'Director',
									dataIndex:'directorName',
									width:310
								},{
									text:'Rating',
									dataIndex:'rating',
									width:200
								},
								{
									text:'Special Features',
									dataIndex:'specialFeatures',
									width:200
								}
							],
							renderTo:Ext.getBody(),
							selModel:{
								type:'checkboxmodel',
								checkOnly:true,
								model:'SIMPLE',
								injectCheckbox:'first',
							listeners:{
								'select':function()
								{
									
									console.log(movieGrid.getView().getNode(1)),
									count += 1;
									if(count > 0)
									{
										Ext.getCmp('deleteButton').setDisabled(false);
									}
									if(count  == 1)
									{
										Ext.getCmp('editButton').setDisabled(false);
									}
									else
									{
										Ext.getCmp('editButton').setDisabled(true);
									}
									
								},
								'deselect':function()
								{
									count -= 1;
									if(count <= 0)
									{
										Ext.getCmp('deleteButton').setDisabled(true);
									}
									if(count != 1)
									{
										Ext.getCmp('editButton').setDisabled(true);
									}
									else
									{
										Ext.getCmp('editButton').setDisabled(false);
									}
									
								}
							}	
							},
							dockedItems:[{
								xtype:'pagingtoolbar',
								width:'100%',
								displayInfo:false,
								align:'center',
								margin:'0 500 0 470',
								
								store:Ext.data.StoreManager.lookup('Movies'),
								items:[{
									
								xtype:'button',
								text:'Add',
								handler:function()
								{
									
								var myForm = Ext.create('Ext.window.Window',{
								    width: 500,
								    height: 550,
								    title: 'Add Film',
								    floating: true,
								    closable : true,
				
									defaults:
									{
										width:"90%",
										margin:'20 20 20 20',
										labelStyle:'color:#000000;text-style:bold;'
									},
									items:[
										{
											xtype:'textfield',
											id:'titleField',
											fieldLabel:'Title:',
											
										},
										
										{
											xtype:'numberfield',
											minValue: 2000,
											maxValue:2010,
											fieldLabel:'Release year:',
											id:'releaseYearField'
										},
										
										{
											xtype:'combobox',
											fieldLabel:'Special Features:',
											id:'specialFeaturesField',
											store:{
						extend:'Ext.data.Store',
						
						fields:['SF'],
						data:[
							{
								"SF":'Trailers'
							},
							{
								"SF":'Commentaries'
							},
							{
								"SF":'Deleted Scenes'
							},
							{
								"SF":'Behind the Scenes'
							}
						],
						
					},
					displayField:'SF'
										},
										
										{
											xtype:'combobox',
											fieldLabel:'Rating:',
											id:'ratingField',store:{
										extend:'Ext.data.Store',
										
										fields:['Rating'],
										data:[
											{
												'Rating':'PG'
											},
											{
												'Rating':'R'
											},{
												'Rating':'G'
											},
											{
												'Rating':'PG-13'
											},
											{
												'Rating':'NC-17'
											}
											
										],
										
										},
										displayField:'Rating'
										},
										
										{
											xtype:'combobox',
											fieldLabel:'Language:',
											id:'languageField',store:{
										extend:'Ext.data.Store',
										
										fields:['Language','id'],
										data:[
											{
												'Language':'English',
												'id':1
										},
										{
												'Language':'Italian',
												'id':2
										},{
												'Language':'Japanese',
												'id':3
										},
										{
												'Language':'Mandarin',
												'id':4
										},
										{
												'Language':'French',
												'id':5
										},
										{
												'Language':'German',
												'id':6
										},
										{
												'Language':'Mongolian',
												'id':7
										}
										
										
										
										]
										},
										displayField:'Language',
										valueField:'id'
										},
										
										{
											xtype:'textfield',
											fieldLabel:'Director Name:',
											id:'directorField'
										},
										
										{
											xtype:'textfield',
											fieldLabel:'Description:',
											height:100,
											id:'descriptionField'
										}
										
									],
									
								});
								myForm.show();
								 var butons = 	Ext.create('Ext.Container',{
									
									itemAlign:'center',
									defaults:{
										margin:5,
										padding:10
									},
									items:[{
										xtype:'button',
										text:'Save',
										handler:function()
										{
											if(Ext.getCmp('titleField').value.trim() == "" || Ext.getCmp('descriptionField').value.trim()=="" ||
													Ext.getCmp('releaseYearField').value == "" || Ext.getCmp('languageField').value =="" ||
													Ext.getCmp('directorField').value.trim() == "" || Ext.getCmp('ratingField').value == "" || Ext.getCmp('specialFeaturesField').value == "")
													{
														Ext.Msg.alert('Please Fill all the Fields');
														
													}
											else
											{
												
										Ext.Ajax.request({
                       					url: 'http://localhost:8080/Summer_Internship_Backend/addFilm.action',//Defined path of function defined in MVC 
                        				method: 'POST',     
										  // controller
                        				params: {
		                            				title :Ext.getCmp('titleField').value,
													description :Ext.getCmp('descriptionField').value,
													releaseYear : Ext.getCmp('releaseYearField').value,
													language : Ext.getCmp('languageField').value,
													directorName : Ext.getCmp('directorField').value,
													rating : Ext.getCmp('ratingField').value,
													specialFeatures : Ext.getCmp('specialFeaturesField').value,
													//isFilter:0
                        						},
	                                   success: function() 
													{
	                            						Ext.Msg.alert("Data Added Succesfully");
														movieGrid.store.load({
															params:{
																isFilter:"0",
																start:"0",
																limit:"10"
															}
														});
														myForm.destroy();
	                       							},
                        				failure: function() 
													{
                            							Ext.Msg.alert("Data Adding Failed");
                       								 }
											
											
											
											
										});
											}
									
										
										
										}},
									
									{
										xtype:'button',
										text:'Cancel',
										handler:function()
										{
											myForm.destroy();
										}
									}]
								})
								
									myForm.add(butons);					
								}
							
								},
								{
									xtype:'button',
									text:'Edit',
									id:'editButton',
									disabled:true,
								handler:function()
								{
									
									var data = Ext.getCmp('detailsGrid').getSelectionModel();
									var r = data.getSelection();
									data = r[0];
									
									
								var myForm = new Ext.create('Ext.window.Window',{
								    width: 500,
								    height: 550,
								    title: 'Edit Film',
								  
				
									defaults:
									{
										width:"90%",
										margin:'20 20 20 20',
										labelStyle:'color:#000000;text-style:bold;'
									},
									items:[
										{
											xtype:'textfield',
											fieldLabel:'Title:',
											id:'titleId',
											value:data.get('title')
											
										},
										
										{
											xtype:'numberfield',
											minValue: 2000,
											maxValue:2010,
											fieldLabel:'Release year:',
											id:'releaseYearId',
											value:data.get('releaseYear')
										},
										
										{
											
											
											xtype:'combobox',
											fieldLabel:'Special Features:',
											id:'specialFeaturesId',
											store:{
						extend:'Ext.data.Store',
						
						fields:['SF'],
						data:[
							{
								"SF":'Trailers'
							},
							{
								"SF":'Commentaries'
							},
							{
								"SF":'Deleted Scenes'
							},
							{
								"SF":'Behind the Scenes'
							}
						],
						
					},
					displayField:'SF',
					value:data.get('specialFeatures')
										},
										
										{
											xtype:'combobox',
											fieldLabel:'Rating:',
											id:'ratingId',
											value:data.get('rating'),
											store:{
										extend:'Ext.data.Store',
										
										fields:['Rating'],
										data:[
											{
												'Rating':'PG'
											},
											{
												'Rating':'R'
											},{
												'Rating':'G'
											},
											{
												'Rating':'PG-13'
											},
											{
												'Rating':'NC-17'
											}
											
										],
										
										},
										displayField:'Rating'
										},
										
										{
											xtype:'combobox',
											fieldLabel:'Language:',
											id:'languageId',
											value:data.get('language'),
											store:{
										extend:'Ext.data.Store',
										
										fields:['Language','ID'],
										data:[
											{
												'Language':'English',
												'ID':1
										},
										{
												'Language':'Italian',
												'ID':2
										},{
												'Language':'Japanese',
												'ID':3
										},
										{
												'Language':'Mandarin',
												'ID':4
										},
										{
												'Language':'French',
												'ID':5
										},
										{
												'Language':'German',
												'ID':6
										},
										{
												'Language':'Mongolian',
												'ID':7
										}
										
										
										
										]
										},
										displayField:'Language',
										valueField:'ID'
										},
										
										{
											xtype:'textfield',
											fieldLabel:'Director Name:',
											id:'directorId',
											value:data.get('directorName')
										},
										
										{
											xtype:'textfield',
											fieldLabel:'Description:',
											height:100,
											id:'descriptionId',
											value:data.get('description')
										}
										
									],
									
								});
								myForm.show();
								 var butons = 	Ext.create('Ext.Container',{
									
									itemAlign:'center',
									defaults:{
										margin:5,
										padding:10
									},
									items:[{
										xtype:'button',
										text:'Save',
										handler:function()
										{
										
										if(Ext.getCmp('titleId').value.trim() == "" || Ext.getCmp('descriptionId').value.trim() == "" || Ext.getCmp('releaseYearId').value == "" || Ext.getCmp('languageId').value == "" || Ext.getCmp('specialFeaturesId').value.trim() == "" || Ext.getCmp('directorId').value.trim() == "" || Ext.getCmp('ratingId').value.trim() == ""  )
										{
											Ext.Msg.alert("Please Fill all the Fields");
										}
										else{
											
										Ext.Ajax.request({
                       					url: "http://localhost:8080/Summer_Internship_Backend/updateFilm.action?title="+Ext.getCmp('titleId').value+"&description="+Ext.getCmp('descriptionId').value+"&releaseYear="+Ext.getCmp('releaseYearId').value+"&language="+Ext.getCmp('languageId').value+"&directorName="+Ext.getCmp('directorId').value+"&rating="+Ext.getCmp('ratingId').value+"&specialFeatures="+Ext.getCmp('specialFeaturesId').value+"&filmId="+data.get('filmId'),
                        				method: 'PUT',       // controller
                        				/*params: {
		                            				title :Ext.getCmp('titleId').value,
													description :Ext.getCmp('descriptionId').value,
													releaseYear : Ext.getCmp('releaseYearId').value,
													language : Ext.getCmp('languageId').value,
													directorName : Ext.getCmp('directorId').value,
													rating : Ext.getCmp('ratingId').value,
													specialFeatures : Ext.getCmp('specialFeaturesId').value,
													filmId:data.get('filmId'),
												},*/
									
	                                   success: function () 
													{
														
	                            						Ext.Msg.alert("Data Updated Succesfully");
														count -= 1;
														myForm.destroy();
														movieGrid.store.load({
															params:{
																isFilter:"0",
																start:"0",
																limit:"10"
															}
														});
	                       							},
                        				failure: function () 
													{
                            							Ext.Msg.alert("Data Updation Failed");
                       								 }
											
											
											
											
										});
										}
										
									}},
									{
										xtype:'button',
										text:'Cancel',
										handler:function()
										{
											myForm.destroy();
										}
									}]
								})
								
									myForm.add(butons);					
								}
								},
								{
									xtype:'button',
									text:'Delete',
									id:'deleteButton',
									disabled:true,
									handler:function(){
										
										
										var win = Ext.create('Ext.window.Window',{
											title:'Delete Film',
											width:200,
											height:300,
											layout:'fit',
											items:[{
												xtype:'displayfield',
												fieldLabel:'Do you want to delete these items?',
												margin:'20 20 20 20',
												labelStyle:'color:#000000;text-style:bold;',
												padding:'10 10 10 10'
												
											}],
											
											bbar:[
												{
													xtype:'button',
													text:'OK',
													handler:function(){
														var data = Ext.getCmp('detailsGrid').getSelectionModel();
														var r = data.getSelection();
														data = r[0];
														
														var filmIds = new Array();
														for(var i = 0;i<r.length;i++)
														{
															filmIds.push(r[i].get('filmId'));
														}
														
														Ext.Ajax.request({
                       					url: 'http://localhost:8080/Summer_Internship_Backend/deleteFilm.action?filmId='+filmIds,//Defined path of function defined in MVC 
                        				method: 'DELETE',       // controller
                        				
	                                   success: function () 
													{
	                            						Ext.Msg.alert("Data Deleted Succesfully");
														count -= 1;
														Ext.getCmp('editButton').setDisabled(true);
														Ext.getCmp('deleteButton').setDisabled(true);  
														
														movieGrid.store.load({
															params:{
																Filter:"0",
																start:"0",
																limit:"10"   
															}
														});
														win.destroy();
														
		                       							},
                        				failure: function () 
													{
                            							alert('fail');
                       								 }
											
											
											
											
										});
														
														//Delete functionality to be added to delet data from database.
													}
												},
												{
													xtype:'button',
													text:'Cancel',
													handler:function()
													{
														win.destroy();
													}
												}
											]
										}).show();
										
									}
								}]
							},
							]
							
							
						})
					}
		
		





});